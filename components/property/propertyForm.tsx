"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import { Property } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface PropertyFormProps {
  showPropertyForm: Function;
  property: Property;
}

export default function PropertyForm({ showPropertyForm,property }: PropertyFormProps) {
  const {fetchProperties} = usePropertyStore();
  
  const [curProperty, setCurProperty] = useState<Property>({name:"",_id:""});

  useEffect(()=>(setCurProperty(property)),[property]);
  
  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const method = curProperty._id ? "PUT" : "POST";
    const url = curProperty._id ? `/api/properties/${curProperty._id}` : `/api/properties`;
    const {msg, err} = await fetchData({url, method, body:curProperty});
    showPropertyForm(false);
    showToast(err || msg);
    fetchProperties();
    setCurProperty({name:""});
  };
  
  return (
    <section className="z-10 absolute flex flex-col w-full h-full justify-center items-center top-0 left-0">
      <form
        className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 flex flex-col gap-5 p-2 shadow-lg bg-white rounded"
        onSubmit={handlePropertySubmit}
      >
        <h1>Property Form</h1>
        <Input 
          type="text" 
          placeholder="Name" 
          value={curProperty.name || ''} 
          onChange={(e) => setCurProperty({ ...curProperty, name: e.target.value })} 
        />
        <Button tl={`Add Property`} handleClick={()=>{}} />
        <button onClick={() => showPropertyForm(false)}>Cancel</button>
      </form>
    </section>
  );
}
