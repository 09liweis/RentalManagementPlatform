'use client';
import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import useAppStore from "@/stores/appStore"
import { Room } from "@/types/room";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RoomList from "@/components/room/RoomList";

export default function Rooms() {
  const {t} = useAppStore();

  const [allRooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async() => {
    setLoading(true);
    const {rooms, err} = await fetchData({url:'/api/rooms'});
    setLoading(false);
    if (err) {
      showToast(err);
    } else {
      setRooms(rooms);
    }
  }

  useEffect(()=>{
    fetchRooms();
  },[]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // 子元素之间的延迟
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <RoomList rooms={allRooms} />
  )
}