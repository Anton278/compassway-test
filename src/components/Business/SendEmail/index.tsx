import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type SubmitHandler, useForm } from "react-hook-form";
import { convertDraftEditorStateToHtml } from "../../../utils/convertDraftEditorStateToHtml";
import { useState } from "react";
import { EditorState } from "draft-js";
import { useSelector } from "react-redux";

import { selectUser } from "../../../redux/authSlice/selectors";
import { REGEXS } from "../../../utils/const";
import RichTextEditor from "./RichTextEditor";
import { sendEmail } from "../../../redux/emailsSlice/thunks";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

type Inputs = {
  recipient: string;
  subject: string;
};

export default function SendEmail() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // todo: better text field validation
  const [textError, setTextError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const message = convertDraftEditorStateToHtml(
      editorState.getCurrentContent()
    ) as string;
    if (!message) {
      setTextError("This field is required");
      return;
    }

    console.log({ data });
    try {
      setTextError("");
      setIsSubmitting(true);

      await dispatch(sendEmail({ ...data, message, sender: user.id })).unwrap();
      setShowSuccessSnackbar(true);
      reset();
      setEditorState(EditorState.createEmpty());
    } catch (err) {
      console.log({ err });
      setError("Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Send email</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
            }}
          >
            <TextField
              label="Sender"
              variant="outlined"
              helperText=" "
              disabled
              value={user.email}
            />
            <TextField
              error={!!errors.recipient}
              label="Recipient"
              variant="outlined"
              placeholder="johndoe@gmail.com"
              helperText={errors.recipient?.message || " "}
              {...register("recipient", {
                required: "This field is required",
                pattern: {
                  value: REGEXS.email,
                  message: "Invalid email address",
                },
                maxLength: {
                  value: 254,
                  message: "Max length 254",
                },
              })}
            />
            <TextField
              error={!!errors.subject}
              label="Subject"
              variant="outlined"
              helperText={errors.subject?.message || " "}
              {...register("subject", {
                required: "This field is required",
                maxLength: {
                  value: 254,
                  message: "Max length 254",
                },
              })}
            />

            <div>
              <Typography sx={{ marginBottom: "5px" }}>Text:</Typography>
              <RichTextEditor
                editorState={editorState}
                setEditorState={setEditorState}
                error={textError}
              />
            </div>
            <Button
              variant="contained"
              sx={{ marginTop: "15px", marginLeft: "auto" }}
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </form>
          {error && (
            <Typography
              color="error"
              sx={{ textAlign: "center", marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
        autoHideDuration={6000}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Email successfully sent
        </Alert>
      </Snackbar>
    </div>
  );
}
