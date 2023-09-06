import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import type { FC } from "react";

const EditProfileButton: FC = () => {
  return (
    <TouchableOpacity>
      <div
        style={{
          flex: "1 1 0",
          height: 38,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 8,
          paddingBottom: 8,
          background: "#6949FF",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          display: "flex",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontFamily: "Nunito",
            fontWeight: "600",
            lineHeight: 22.4,
            letterSpacing: 0.2,
            wordWrap: "break-word",
          }}
        >
          Tests
        </div>
      </div>
    </TouchableOpacity>
  );
};

export default EditProfileButton;
