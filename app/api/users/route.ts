import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not authorized" }, { status: 401 });
    }

    await connect();

    // Check if user is admin
    const currentUser = await User.findById(verified.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return NextResponse.json(
        { err: "Admin access required" },
        { status: 403 }
      );
    }

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "ct";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build search query
    const searchQuery: any = { isDelete: { $ne: 1 } };
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Fetch users with pagination
    const users = await User.find(
      searchQuery,
      "name email phone address locale isVerified isAdmin ct"
    )
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / limit);

    // Get user statistics
    const stats = await User.aggregate([
      { $match: { isDelete: { $ne: 1 } } },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          verifiedUsers: {
            $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
          },
          adminUsers: {
            $sum: { $cond: [{ $eq: ["$isAdmin", true] }, 1, 0] },
          },
          newUsersThisMonth: {
            $sum: {
              $cond: [
                {
                  $gte: [
                    "$ct",
                    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    return NextResponse.json(
      {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        stats: stats[0] || {
          totalUsers: 0,
          verifiedUsers: 0,
          adminUsers: 0,
          newUsersThisMonth: 0,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Admin users fetch error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not authorized" }, { status: 401 });
    }

    await connect();

    // Check if user is admin
    const currentUser = await User.findById(verified.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return NextResponse.json(
        { err: "Admin access required" },
        { status: 403 }
      );
    }

    const { userId, isAdmin, isVerified } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { err: "User ID is required" },
        { status: 400 }
      );
    }

    // Prevent admin from removing their own admin status
    if (userId === verified.userId && isAdmin === false) {
      return NextResponse.json(
        { err: "Cannot remove your own admin privileges" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (typeof isAdmin === "boolean") updateData.isAdmin = isAdmin;
    if (typeof isVerified === "boolean") updateData.isVerified = isVerified;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "name email phone address locale isVerified isAdmin ct",
    });

    if (!updatedUser) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Admin user update error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not authorized" }, { status: 401 });
    }

    await connect();

    // Check if user is admin
    const currentUser = await User.findById(verified.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return NextResponse.json(
        { err: "Admin access required" },
        { status: 403 }
      );
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { err: "User ID is required" },
        { status: 400 }
      );
    }

    // Prevent admin from deleting themselves
    if (userId === verified.userId) {
      return NextResponse.json(
        { err: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Soft delete by setting isDelete flag
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: 1 },
      { new: true }
    );

    if (!deletedUser) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Admin user delete error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}