import Tenant from "@/models/tenant";
import Rent from "@/models/rent";

export const updateTenantRents = async (tenantId: string) => {
  const foundTenant = await Tenant.findOne({ _id: tenantId });
    if(foundTenant){
      const totalRents = await Rent.find({ tenant: foundTenant._id, status: 2 }); // 2 means 'paid'
      let totalRent = 0;
      totalRents.forEach(rent => {
        console.log(rent.amount);
        totalRent += rent.amount || 0;
      });
      foundTenant.totalRent = totalRent;
      await foundTenant.save();
    }
};