import { ROOM_TP_ARRAY } from "@/types/room";
import useAppStore from "@/stores/appStore";
import Button from "../common/Button";
import FormBackdrop from "../common/form/FormBackdrop";
import FormWrapper from "../common/form/FormWrapper";

import Input from "../common/Input";
import SelectGroup from "../common/SelectGroup";

export default function RoomForm({room,setRoom,handleRoomSubmit,setShowRoomForm}:any) {
  const { t } = useAppStore();
  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleRoomSubmit}>
        <Input
          type="text"
          placeholder={t("dashboard.Name")}
          value={room["name"] || ""}
          onChange={(e) => setRoom({ ...room, name: e.target.value })}
        />
        <SelectGroup
          value={room["tp"] || ""}
          options={ROOM_TP_ARRAY}
          label="Room Type"
          handleSelect={(value) => setRoom({ ...room, tp: value })}
        />
        <div className="flex justify-between">
          <Button
            tl={`${room?._id ? t("dashboard.Update") : t("dashboard.Add")}`}
            handleClick={() => {}}
          />
          <Button
            tl={t("dashboard.Cancel")}
            handleClick={() => {
              setShowRoomForm(false);
              setRoom({});
            }}
            tp="danger"
          />
        </div>
      </FormWrapper>
    </FormBackdrop>
  )
}