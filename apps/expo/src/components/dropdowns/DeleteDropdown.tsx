import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import type { FC } from "react";
import { AlertModal } from "../modals/AlertModal";

interface Props {
  onDelete: () => void;
  isLoading?: boolean;
  itemName?: string;
}

const DeleteDropdown: FC<Props> = ({
  onDelete,
  isLoading = false,
  itemName = "item",
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const handleDelete = () => {
    setOpenAlert(true);
  };

  const formatItemName = (screenName: string) => {
    const item = screenName.split(" ");

    if (item) {
      return item[1]?.toLowerCase();
    }

    return screenName;
  };

  return (
    <>
      <TouchableOpacity onPress={handleDelete}>
        {isLoading ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <AntDesign name="delete" size={24} color="red" />
        )}
      </TouchableOpacity>
      <AlertModal
        isVisible={openAlert}
        alertTitle={"Are you sure?"}
        alertDescription={`Do you want to delete this ${formatItemName(
          itemName,
        )}?`}
        confirmButtonText={"Yes"}
        isCancelButtonVisible={true}
        cancelButtonText={"Cancel"}
        onCancel={() => {
          setOpenAlert(false);
        }}
        onConfirm={onDelete}
      />
    </>
  );
};

export default DeleteDropdown;
