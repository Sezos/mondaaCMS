/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";

// reactstrap components

import Header from "components/Headers/Header.js";
import services from "../service/service";
import List from "./List";
import UserInfo from "./UserInfo";

const UserScreen = (props) => {
  const fields = ["employeeId", "name", "email", "phone", "role"];

  const [employees, setEmployee] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data = await services.getUsers();
    setEmployee(
      data?.map((dat) => {
        return {
          ...dat,
          name: dat.firstName + " " + dat.lastName,
        };
      }),
    );
  };

  const open = (data) => {
    setSelectedId(data.id);
  };

  return (
    <>
      <Header />
      {selectedId === null ? (
        <div className="mt--7">
          <List
            data={employees}
            fields={fields}
            name={"Users"}
            onClick={open}
          />
        </div>
      ) : (
        <UserInfo selectedId={selectedId} setSelectedId={setSelectedId} />
      )}
    </>
  );
};

export default UserScreen;

/*
  id                Int               @id @default(autoincrement())
  firstName         String
  lastName          String
  nickName          String?
  avatar            String?           @db.VarChar(40)
  PhotoID           String?           @db.VarChar(40)
  PhotoIDBack       String?           @db.VarChar(40)
  OtherCard         String?           @db.VarChar(40)
  workWhiteCardBack String?           @db.VarChar(40)
  email             String            @unique
  password          String
  phone             String?           @db.VarChar(30)
  address           String?           @db.VarChar(255)
  emergencyPhone    String?           @db.VarChar(30)
  emergencyName     String?
  emergencyEmail    String?
  accountBSB        String?           @db.VarChar(20)
  accountNumber     String?           @db.VarChar(30)
  accountName       String?
  workWhiteCard     String?           @db.VarChar(40)
  workABN           String?           @db.VarChar(40)
  workTFN           String?           @db.VarChar(40)
  workVisaType      String?           @db.VarChar(40)
  role              UserRoleType      @default(Employee)
  status            RegisterStatus    @default(Pending)
  isReviewed        Int               @default(0)
  fcmToken          String?           @db.VarChar(255)
  link              String?           @db.VarChar(26)
  linkDate          DateTime?
  experience        String?           @db.VarChar(40)
  position          String?           @db.VarChar(40)
  employeeId        String?           @db.VarChar(4)
  isGST             Boolean?
  rate              Int?
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  ProjectUsers      ProjectUser[]
  formanAt          ProjectLocation[]
  workHour          workHours[]


*/
