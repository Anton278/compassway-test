import {
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { selectEmails } from "../../../redux/emailsSlice/selectors";
import { getEmails } from "../../../redux/emailsSlice/thunks";
import type { RootState } from "../../../redux/store";

export default function SentEmailsTable() {
  const dispatch = useAppDispatch();
  const emails = useSelector(selectEmails);
  const count = useSelector((state: RootState) => state.emails.emails.count);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [rowsPerPage] = useState(30);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getAllEmails = async () => {
      try {
        await dispatch(
          getEmails({
            limit: rowsPerPage,
            offset: page * (rowsPerPage - 1),
          })
        ).unwrap();
      } catch (err) {
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getAllEmails();
  }, [page]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: "40px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>loading...</TableRow>
            ) : (
              emails.map((email) => (
                <TableRow
                  key={email.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{email.id}</TableCell>
                  <TableCell>{email.recipient}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {!isLoading && (
          <TablePagination
            component={"div"}
            rowsPerPageOptions={[rowsPerPage]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        )}
      </TableContainer>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showError}
        onClose={() => setShowError(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Failed to get emails
        </Alert>
      </Snackbar>
    </>
  );
}
