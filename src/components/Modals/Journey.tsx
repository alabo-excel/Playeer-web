import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import Modal from "../Modal";
import { Plus } from "lucide-react";
import { positions } from "@/utils/positions";

const JourneyModal = ({
  show,
  onClose,
  journeyToEdit,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  journeyToEdit?: any;
  onSuccess?: () => void;
}) => {
  // Journey form state
  const [journeyForm, setJourneyForm] = useState({
    teamName: "",
    position: "",
    from: "",
    to: "",
    highlights: "",
  });

  useEffect(() => {
    setJourneyForm({
      teamName: journeyToEdit?.teamName,
      position: journeyToEdit?.position,
      from: journeyToEdit?.from,
      to: journeyToEdit?.to,
      highlights: journeyToEdit?.highlights,
    });
  }, [journeyToEdit]);

  const [journeyError, setJourneyError] = useState<string | null>(null);
  const [journeySubmitting, setJourneySubmitting] = useState(false);
  const [journeyErrors, setJourneyErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const handleJourneyInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJourneyForm((prev) => ({ ...prev, [name]: value }));
    if (journeyErrors[name]) {
      setJourneyErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleJourneySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!journeyForm.teamName.trim())
      newErrors.teamName = "Team/Club name is required";
    if (!journeyForm.position.trim())
      newErrors.position = "Position is required";
    if (!journeyForm.from) newErrors.from = "From date is required";
    if (!journeyForm.to) newErrors.to = "To date is required";
    if (Object.keys(newErrors).length > 0) {
      setJourneyErrors(newErrors);
      return;
    }
    setJourneyErrors({});
    setJourneySubmitting(true);
    try {
      if (journeyToEdit && journeyToEdit._id) {
        // Edit journey (PUT)
        await api.put(`/onboarding/journey`, {
          entry: {
            ...journeyForm,
          },
          id: journeyToEdit._id,
        });
      } else {
        // Add journey (POST)
        await api.post("/onboarding/journey", journeyForm);
      }
      if (onSuccess) onSuccess();
      onClose();
      setJourneyForm({
        teamName: "",
        position: "",
        from: "",
        to: "",
        highlights: "",
      });
    } catch (err: any) {
      console.log(err);
      setJourneyError(err.response.data.message);
    } finally {
      setJourneySubmitting(false);
    }
  };

  return (
    <>
      {show && (
        <Modal onClose={onClose} width="600px">
          <form onSubmit={handleJourneySubmit}>
            <div>
              <p className="text-lg font-bold">
                {journeyToEdit ? "Edit" : "Add New"} Football Journey
              </p>
              <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                  <label className="font-semibold text-sm mb-2">
                    Team/Club Name
                  </label>
                  <input
                    placeholder="e.g., “Future Stars Academy”"
                    type="text"
                    name="teamName"
                    value={journeyForm.teamName}
                    onChange={handleJourneyInput}
                    className={`p-3 rounded-md w-full ${
                      journeyErrors.teamName
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {journeyErrors.teamName && (
                    <p className="text-red-500 text-xs mt-1">
                      {journeyErrors.teamName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-sm mb-2">Position</label>
                  <select
                    name="position"
                    value={journeyForm.position}
                    onChange={handleJourneyInput}
                    className={`p-3 rounded-md w-full ${
                      journeyErrors.position
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  >
                    <option className="hidden" value="">
                      Select
                    </option>
                    {positions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {journeyErrors.position && (
                    <p className="text-red-500 text-xs mt-1">
                      {journeyErrors.position}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-sm mb-2">From</label>
                  <input
                    type="date"
                    name="from"
                    value={journeyForm.from}
                    onChange={handleJourneyInput}
                    className={`p-3 rounded-md w-full ${
                      journeyErrors.from
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {journeyErrors.from && (
                    <p className="text-red-500 text-xs mt-1">
                      {journeyErrors.from}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-sm mb-2">To</label>
                  <input
                    type="date"
                    name="to"
                    value={journeyForm.to}
                    onChange={handleJourneyInput}
                    className={`p-3 rounded-md w-full ${
                      journeyErrors.to
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {journeyErrors.to && (
                    <p className="text-red-500 text-xs mt-1">
                      {journeyErrors.to}
                    </p>
                  )}
                </div>
              </div>

              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Key Highlights
                </label>
                <textarea
                  placeholder="Optional description"
                  name="highlights"
                  value={journeyForm.highlights}
                  onChange={handleJourneyInput}
                  className="p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4] h-32"
                ></textarea>
              </div>
              {journeyError && (
                <div className="text-red-500 text-sm mb-2">{journeyError}</div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center gap-3 text-white p-3 rounded-full bg-primary mt-4 text-sm"
                disabled={journeySubmitting}
              >
                <Plus size={15} />
                <span className="my-auto">
                  {journeySubmitting
                    ? journeyToEdit
                      ? "Saving..."
                      : "Adding..."
                    : journeyToEdit
                    ? "Save Changes"
                    : "Add Club/Academy Experience"}
                </span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default JourneyModal;
