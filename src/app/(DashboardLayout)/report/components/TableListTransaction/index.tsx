import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RowTblHeadTransaction from "../RowTblHeadTransaction";
import RowTblDataTransaction from "../RowTblDataTransaction";
import TablePaginationActions from "../TablePaginationAction";
import { useEffect, useMemo, useState } from "react";
import { PostReportDtoPayload } from "../../../../../types/apiTypes";

const TableTransactions = ({
  isLoading,
  postReportDtos,
  listBranch,
  paginationPayload,
  onPageChange,
}: {
  isLoading: boolean;
  postReportDtos: PostReportDtoPayload | null;
  listBranch:
    | []
    | {
        branchId: string;
        branchName: string;
      }[];
  paginationPayload: {
    offset: number;
    limit: number;
  };
  totalDataPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
}) => {
  const [rightWidth, setRightWidth] = useState(0);

  useEffect(() => {
    const lastCol = document.getElementsByClassName(
      "sticky-header",
    ) as HTMLCollectionOf<HTMLElement>;
    if (lastCol) {
      setRightWidth(lastCol[lastCol.length - 1].offsetWidth);
    }
  }, []);

  const checkIsExistData = useMemo(() => {
    if (postReportDtos && postReportDtos.postReportDtos.length > 0) {
      return postReportDtos?.postReportDtos?.map((item, index) => (
        <RowTblDataTransaction
          key={index}
          data={item}
          index={index}
          rightWidth={rightWidth}
          listBranch={listBranch}
        />
      ));
    }
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Typography noWrap variant="body1" textAlign={"center"}>
            No Data
          </Typography>
        </TableCell>
      </TableRow>
    );
  }, [postReportDtos, isLoading]);

  return (
    <>
      <TableContainer sx={{ width: "100%", maxHeight: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <RowTblHeadTransaction rightWidth={rightWidth} />
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography noWrap variant="body1" textAlign={"center"}>
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              checkIsExistData
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[100]}
              colSpan={8}
              count={(postReportDtos?.totalData || 0) as number}
              rowsPerPage={100}
              page={Math.ceil(paginationPayload.offset / 100)}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={onPageChange}
              onRowsPerPageChange={() => {}}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableTransactions;
