"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";

export default function FileInputExample() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file change logic here
    }
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        {/* <FileInput onChange={handleFileChange} className="custom-class" /> */}
      </div>
    </ComponentCard>
  );
}
