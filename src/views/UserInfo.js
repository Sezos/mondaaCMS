import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import services from "./../service/service";
import Info from "./Info";

const UserInfo = (props) => {
  const { selectedId, setSelectedId } = props;
  const [data, setData] = useState({});
  const fields = [
    {
      name: "Employee ID",
      value: "employeeId",
      type: "text",
      isEditable: true,
    },
    {
      name: "First Name",
      value: "firstName",
      type: "text",
      isEditable: false,
    },
    {
      name: "Last Name",
      value: "lastName",
      type: "text",
      isEditable: false,
    },
    {
      name: "Nick Name",
      value: "nickName",
      type: "text",
      isEditable: true,
    },
    { name: "Avatar", value: "avatar", type: "image", isEditable: true },
    { name: "PhotoID", value: "PhotoID", type: "image", isEditable: true },
    {
      name: "Photo ID Back Side",
      value: "PhotoIDBack",
      type: "image",
      isEditable: true,
    },
    {
      name: "Other Cards",
      value: "OtherCard",
      type: "image",
      isEditable: true,
    },

    {
      name: "White Card",
      value: "workWhiteCard",
      type: "image",
      isEditable: true,
    },
    {
      name: "White Card Back Side",
      value: "workWhiteCardBack",
      type: "image",
      isEditable: true,
    },
    { name: "Email", value: "email", type: "text", isEditable: true },
    { name: "Phone", value: "phone", type: "text", isEditable: true },
    { name: "Address", value: "address", type: "text", isEditable: true },
    {
      name: "Emergency Name",
      value: "emergencyName",
      type: "text",
      isEditable: true,
    },
    {
      name: "Emergency Phone",
      value: "emergencyPhone",
      type: "text",
      isEditable: true,
    },
    {
      name: "Emergency Email",
      value: "emergencyEmail",
      type: "text",
      isEditable: true,
    },
    {
      name: "BSB",
      value: "accountBSB",
      type: "text",
      isEditable: true,
    },
    {
      name: "Account Number",
      value: "accountNumber",
      type: "text",
      isEditable: true,
    },
    {
      name: "Account Name",
      value: "accountName",
      type: "text",
      isEditable: true,
    },
    { name: "ABN", value: "workABN", type: "text", isEditable: true },
    { name: "TFN", value: "workTFN", type: "text", isEditable: true },
    {
      name: "Visa Type",
      value: "workVisaType",
      type: "text",
      isEditable: true,
    },
    {
      name: "Role",
      value: "role",
      type: "picker",
      options: [
        { label: "Leader", value: "Leader" },
        { label: "Employee", value: "Employee" },
      ],
      isEditable: true,
    },
    {
      name: "Status",
      value: "status",
      type: "picker",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
        { label: "Suspended", value: "Suspended" },
      ],
      isEditable: true,
    },
    {
      name: "is Reviewed",
      value: "isReviewed",
      type: "picker",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
      isEditable: true,
    },
    {
      name: "Experience",
      value: "experience",
      type: "text",
      isEditable: true,
    },
    {
      name: "is GST",
      value: "isGST",
      type: "picker",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      isEditable: true,
    },
    { name: "Rate", value: "rate", type: "text", isEditable: true },
  ];

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const fetch = async () => {
    const _ = await services.getUserInfo(selectedId);
    setData(_);
  };

  const SubHeader = () => {
    return (
      <Button
        onClick={() => {
          setSelectedId(null);
        }}
      >
        <i className="ni ni-bold-left"></i>
      </Button>
    );
  };

  return (
    <>
      <div className="mt--7 w-screen">
        <Info data={data} fields={fields} SubHeader={SubHeader} />
      </div>
    </>
  );
};

export default UserInfo;

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
