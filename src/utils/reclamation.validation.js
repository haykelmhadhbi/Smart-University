import * as Yup from "yup";

export const reclamationValidation = Yup.object({
  content: Yup.string().required("Content is required").min(15, "Content must contain at least 15 characters"),
  title: Yup.string().required(" title is required"),
  eventId: Yup.number()
    .required("Event is required"),
  ownerId: Yup.string()
    .required("Owner is required")
});