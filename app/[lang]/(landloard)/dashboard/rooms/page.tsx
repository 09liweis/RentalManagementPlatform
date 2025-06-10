'use client';
import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import useAppStore from "@/stores/appStore"
import { Room } from "@/types/room";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <>
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('home.Rooms')}
      </motion.h1>
      <LoadingSection loading={loading}>
        <motion.section 
          className="card-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {allRooms.map((room, index)=>
          <motion.article 
            key={room._id} 
            className={`card ${room.tenant ? '': 'border-green-500 border'}`}
            variants={cardVariants}
            whileHover="hover"
            custom={index}
          >
            <LinkText text={room.name || ''} href={`/dashboard/rooms/${room._id}`} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {t('home.Property')}: {room.property?.name || ''}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {room.tenant?.name}
            </motion.p>
          </motion.article>
        )}
        </motion.section>
      </LoadingSection>
    </>
  )
}