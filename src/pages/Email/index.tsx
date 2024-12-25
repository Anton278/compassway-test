import { Typography } from "@mui/material";

import SendEmail from "../../components/Business/SendEmail";
import SentEmailsTable from "../../components/Business/SentEmailsTable";
import AppLayout from "../../components/Business/Layouts/App";

export default function EmailPage() {
  return (
    <AppLayout>
      <SendEmail />
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Sent emails:
      </Typography>
      <SentEmailsTable />
    </AppLayout>
  );
}
