import { formatDate } from "@/utils/formatDate";
import { Eye, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Dropdown, Menu } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
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
  const [showAchievement, setShowAchievement] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

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
    <div className="rounded-md">
      <div className="relative">
        {type === "highlight" ? (
          <video
            src={data.video}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="relative h-48 flex items-center justify-center overflow-hidden group">
            <img
              src={data.photo}
              alt={data.title}
              className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
            />
            <button onClick={() => showPlay(true)} className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
              <div className="px-6 py-3 bg-primary text-white rounded-full font-medium text-sm hover:bg-blue-600 transition-colors">
                Click to view
              </div>
            </button>
          </div>
        )}

        {type === "highlight" ? (
          <button
            onClick={() => {
              showPlay(true);
              handleViewClick(data._id);
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
            {type === "highlight" ? (
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
              <div className="relative">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: "Edit",
                        onClick: () => {
                          if (type === "highlight") {
                            setShowHighlight(true);
                          } else if (type === "achievement") {
                            setShowAchievement(true);
                          } else if (type === "certificate") {
                            setShowCertificate(true);
                          } else if (editAction) {
                            editAction();
                          }
                        },
                      },
                      {
                        key: "delete",
                        label: <span style={{ color: "red" }}>Delete</span>,
                        onClick: () => {
                          if (type === "highlight") {
                            deletHighlight();
                          } else if (type === "achievement") {
                            deleteAchievement();
                          } else if (type === "certificate") {
                            deleteCertificate();
                          }
                        },
                      },
                    ],
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    &#8942;
                  </button>
                </Dropdown>
              </div>
            </div>
          )}
        </div>

        <div className="">
          <p className="text-[16px] font-bold my-2">
            {data.title || data.certificateTitle}
            {type !== "highlight" ? (
              <span className="text-sm ml-3 my-auto text-[#6C6C6C]">
                ({formatDate(data.createdAt || data.date || data.dateIssued)})
              </span>
            ) : null}
          </p>
        </div>
        <p className="text-[14px]">
          {data.description} <br />
        </p>
        <p className="text-[#5A5A5A] text-[14px]">
          {data.tags}
        </p>
      </div>

      {play && (
        <Modal onClose={() => showPlay(false)} width="800px">
          <section className="w-full">
            <div>
              <p className="text-lg font-bold">{data.title || data.certificateTitle}</p>

            </div>
            <div className="mt-4">
              {type !== "highlight" ? (
                <img
                  src={data.photo}
                  className="w-full h-96 object-cover rounded-lg"
                  alt={data.title}
                />
              ) : <video
                src={data.video}
                className="w-full h-96 object-cover rounded-lg"
                controls
              />}

            </div>
          </section>
        </Modal>
      )}

      <NewHighlights
        fetchHighlights={fetchData}
        showModal={showHighlight}
        data={data}
        onCLose={() => setShowHighlight(false)}
      />

      <AchievementModal
        show={showAchievement}
        onClose={() => setShowAchievement(false)}
        onSuccess={() => fetchData && fetchData()}
        achievementToEdit={data}
      />

      <CertificateModal
        showModal={showCertificate}
        setShowModal={() => setShowCertificate(false)}
        onSuccess={() => fetchData && fetchData()}
        certificateToEdit={data}
      />
    </div>
  );
};

export default Card;
