import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import services from "./../service/service";
import Select from "react-select";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";

const Info = (props) => {
  const { data, fields, SubHeader, doesBack } = props;

  const [datas, setDatas] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDatas(props.data);
  }, [props]);

  const onSave = async () => {
    if (isEditing) {
      try {
        const result = await services.updateUser(data?.id, datas);
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    }
    setIsEditing(!isEditing);
  };
  return (
    <Container
      fluid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card className="shadow" style={{ minWidth: "1000px" }}>
        <CardHeader
          className="d-flex border-0"
          style={{ justifyContent: "space-between", flexDirection: "column" }}
        >
          <div>{SubHeader ? <SubHeader /> : <></>}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <div>
              <b>{data.firstName + " " + data.lastName}</b>
            </div>
            <div>
              <Button
                onClick={onSave}
                color={isEditing ? "primary" : "secondary"}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {fields?.map((field, id) => {
            if (field.type === "picker") {
              return (
                <div>
                  {field.name}
                  <Select
                    value={
                      field.options.filter(
                        (fi) => fi.value === datas[field.value],
                      )[0]
                    }
                    options={field.options}
                    isDisabled={!field.isEditable || !isEditing}
                    onChange={(value) => {
                      setDatas({
                        ...datas,
                        [field.value]: value.value,
                      });
                    }}
                  />
                </div>
              );
            } else if (field.type === "text")
              return (
                <div>
                  {field.name}
                  <InputGroup>
                    <Input
                      color={"black"}
                      placeholder={field.name}
                      value={datas[field.value]}
                      disabled={!field.isEditable || !isEditing}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setDatas({
                          ...datas,
                          [field.value]: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </div>
              );
            return <></>;
          })}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Info;

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
