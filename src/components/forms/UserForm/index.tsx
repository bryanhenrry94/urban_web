"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Tab, Tabs } from "@mui/material";
import { useUserApi } from "@/hooks/useUserApi";
import { useUnitApi } from "@/hooks/useUnitApi";
import { Country } from "@/types/country";
import UserAccount from "./Account";

const UserForm: FC<{ id?: string }> = ({ id }) => {
  const { saveUser, updateUser, fetchUser } = useUserApi();
  const { units, fetchUnits } = useUnitApi();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadUser = async () => {
    try {
      if (!id) return;
      const currentUser = await fetchUser(id);

      if (currentUser) {
        console.log("currentUser: ", currentUser);
        // setValue("name", currentUser.name);
        // setValue("email", currentUser.email);
        // setValue("country", currentUser.country);
        // setValue("role", currentUser.role);
        // setValue("phone", currentUser.phone);
        // setValue("status", currentUser.status);
        // setValue(
        //   "units",
        //   currentUser.units.map((unit) => ({ unit })) // Mapear la estructura correcta
        // );
        setModeEdit(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const loadUnits = async () => {
    try {
      await fetchUnits();
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  useEffect(() => {
    loadUnits();
  }, []);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Perfil" {...a11yProps(0)} />
            <Tab label="Perfil" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserAccount id={id} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default UserForm;
