import { formatDate } from "@/utils/formatDate";
import { Eye, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import NewHighlights from "./Modals/Highlights";
import api from "@/utils/api";
import AchievementModal from "./Modals/Achievement";
import CertificateModal from "./Modals/Certificate";

interface CardProps {
  type?: string;
  data?: any;
  fetchData?: any;
  editAction?: () => void;
  hide?: boolean;
}

const Card: React.FC<CardProps> = ({
  type,
  data,
  fetchData,
  editAction,
  hide,
}) => {
  const [play, showPlay] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  const deletHighlight = async () => {
    await api.delete(`/highlights/${data._id}`);
    fetchData();
  };

  const deleteAchievement = async () => {
    await api.delete(`/onboarding/achievement/${data._id}`);
    fetchData();
  };

  const deleteCertificate = async () => {
    await api.delete(`/onboarding/certificate/${data._id}`);
    fetchData();
  };

  const handleViewClick = async (userId: string) => {
    // setShowModal(true);
    try {
      await api.get(`/highlights/view/${userId}`);
    } catch (err) {
      // handle error if needed
    }
  };

  return (
    <div className="border border-[#E5E5E5] bg-[#FCFCFC] p-1 rounded-md">
      <div className="relative">
        {type === "video" ? (
          <video
            src={data.video}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <img
            src={data?.photo}
            alt="Video thumbnail"
            className="w-full max-h-80 h-44 object-cover rounded-md"
          />
        )}

        {type === "video" ? (
          <button
            onClick={() => {
              showPlay(true);
              handleViewClick(data.userId);
            }}
            className="rounded-full p-4 bg-[#F4F4F4] cursor-pointer w-14 absolute top-14 text-[#232323] left-0 right-0 mx-auto"
          >
            <Play />
          </button>
        ) : null}
      </div>
      <div className="p-2">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            {type === "video" ? (
              <>
                <button className="flex text-xs my-auto bg-[#E5F4FF] justify-between py-1 px-3 rounded-full text-primary">
                  <Eye size={18} />
                  <span className="my-auto ml-1">{data.views.length}</span>
                </button>
                <p className="text-sm my-auto text-[#6C6C6C]">
                  {formatDate(data.createdAt)}
                </p>
              </>
            ) : (
              <button className="flex text-xs bg-[#E5F4FF] justify-between py-1 px-3 rounded-full text-primary">
                <span className="my-auto">
                  {data.organizer || data.issuedBy}
                </span>
              </button>
            )}
            <div></div>
          </div>
          {hide ? null : (
            <div className="ml-auto">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: "Edit",
                      onClick: () => {
                        if (type === "video") {
                          setShowHighlight(true);
                        } else if (type === "achievement") {
                          editAction && editAction();
                        } else {
                          editAction && editAction();
                        }
                      },
                    },
                    {
                      key: "delete",
                      label: "Delete",
                      danger: true,
                      onClick: () => {
                        if (type === "video") {
                          deletHighlight();
                        } else if (type === "achievement") {
                          deleteAchievement();
                        } else {
                          deleteCertificate();
                        }
                      },
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreOutlined style={{ fontSize: 20 }} />
                </button>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="">
          <p className="text-sm font-bold my-2">
            {data.title || data.certificateTitle}
            {type !== "video" ? (
              <span className="text-sm ml-3 my-auto text-[#6C6C6C]">
                ({formatDate(data.createdAt || data.date || data.dateIssued)})
              </span>
            ) : null}
          </p>
        </div>
        <p className="text-sm text-[#6C6C6C]">
          {data.description} <br />
          {data.tags}
        </p>
      </div>

      {play && (
        <Modal onClose={() => showPlay(false)} width="800px">
          <>
            <p className="text-lg font-bold">{data.title}</p>

            <div className="mt-4">
              <video
                src={data.video}
                className="w-full object-cover rounded-lg"
                controls
              />
            </div>
          </>
        </Modal>
      )}

      <NewHighlights
        fetchHighlights={fetchData}
        showModal={showHighlight}
        data={data}
        onCLose={() => setShowHighlight(false)}
      />
    </div>
  );
};

export default Card;
