import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues
} from "@tanstack/react-table";

import UsersTableHeader from './UsersTableHeader';

const UsersTable = ({ tableData, func }) => {
  // 유저 데이터
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(tableData);
  });

  // 검색용 입력 값
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");

  // 입력 값 변경
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 검색 값 기준 필터링
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        row["email"].toLowerCase().includes(email.toLowerCase()) &&
        row["id"].toString().includes(id) &&
        row["nickname"].toLowerCase().includes(nickname.toLowerCase())
      );
    });
  }, [data, email, id, nickname]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("email", { header: "이메일", enableSorting: true,  enableColumnFilter: false, size: 140 }),
    columnHelper.accessor("id", { header: "아이디", enableSorting: true, enableColumnFilter: false, size: 110 }),
    columnHelper.accessor("nickname", { header: "닉네임", enableSorting: true, enableColumnFilter: false, size: 110 }),
    columnHelper.accessor("team", { header: "팀 ", enableSorting: true, filterFn: "includesString", size: 60 }),
    columnHelper.accessor("prediction", { header: "전체예측", enableSorting: true, enableColumnFilter: false, size: 60 }),
    columnHelper.accessor("correctPrediction", { header: "적중예측", enableSorting: true, enableColumnFilter: false, size: 60 })
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex">
          <p className="me-3 mt-2">이메일 검색</p>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            className="border"
            style={{ width: 180, height: 40 }}
          />
        </div>
        <div className="flex">
          <p className="me-3 mt-2">아이디 검색</p>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
            className="border"
            style={{ width: 180, height: 40 }}
          />
        </div>
        <div className="flex">
          <p className="me-3 mt-2">닉네임 검색</p>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            className="border"
            style={{ width: 180, height: 40 }}
          />
        </div>
      </div>
      <table className="table table-secondary table-hover mt-4 rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <UsersTableHeader header={header} key={header.id} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => func(row.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;