import { Edit, Upload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";

const CellAction = ({
  handleUpload,
  categoryPayment,
  // handleEdit,
  // handleDelete,
  // handleDetail,
}: {
  handleUpload: () => void;
  categoryPayment: string;
  // handleEdit: () => void;
  // handleDelete: () => void;
  // handleDetail: () => void;
}) => {
  const conditionalActionBasedOnCategoryPayment = () => {
    if (
      categoryPayment !== "cash" &&
      categoryPayment !== "credit_card" &&
      categoryPayment !== "debit_card"
    ) {
      return (
        <Button onClick={handleUpload}>
          <Upload color="primary" />
        </Button>
      );
    }

    return (
      <Button onClick={() => {}}>
        <Edit color="primary" />
      </Button>
    );
  };
  return (
    <Stack alignItems={"center"} justifyContent={"center"} direction="row">
      {conditionalActionBasedOnCategoryPayment()}
    </Stack>
  );
};

export default CellAction;
