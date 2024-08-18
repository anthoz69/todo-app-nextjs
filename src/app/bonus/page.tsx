"use client"

import {useEffect, useState} from "react";
import {Bonus, BonusData} from "@/types/bonus";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import MainLayout from "@/components/layouts/main-layout";

export default function BonusPage() {
  useEffect(() => {
    const newData = mockJSON.data.map((m): BonusData => ({
      id: String(m[0]),
      no: Number(m[1]),
      title: String(m[2]),
      desc: String(m[3]),
      date: String(m[4])
    }))
    setJsonData({
      columns: mockJSON.columns,
      data: newData
    })
  }, []);

  const [jsonData, setJsonData] = useState<Bonus>()
  return (
    <MainLayout>
      <Table>
        <TableCaption>A list of your mock data.</TableCaption>
        <TableHeader>
          <TableRow>
            {
              jsonData?.columns.map((j) => <TableHead key={j.key}>{j.name}</TableHead>)
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            jsonData?.data.map((j) => (
              <TableRow key={j.id}>
                <TableCell className="font-bold">{j.no}</TableCell>
                <TableCell>{j.id}</TableCell>
                <TableCell>{j.title}</TableCell>
                <TableCell>{j.desc}</TableCell>
                <TableCell>{j.date}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </MainLayout>
  )
}

const mockJSON = {
  "columns": [
    {
      "key": "id",
      "name": "ID"
    },
    {
      "key": "no",
      "name": "No."
    },
    {
      "key": "title",
      "name": "Title"
    },
    {
      "key": "desc",
      "name": "Description"
    },
    {
      "key": "date",
      "name": "Created Date"
    }
  ],
  "data": [
    [
      "f22ecad5-cbb6-402b-995f-6867792bc9c6",
      1,
      "Job 1",
      "This is job 1",
      "1 Oct 2023 12:03:48"
    ],
    [
      "6a412fa7-2c3b-4e38-8973-2b32479bffab",
      2,
      "Job 2",
      "This is job 2",
      "11 Oct 2023 10:03:48"
    ],
    [
      "2c302941-3ba7-413d-84a6-20503355b08a",
      3,
      "Job 3",
      "This is job 3",
      "14 Oct 2023 18:34:48"
    ],
    [
      "eff7e063-3e18-4790-95b4-abf62470e874",
      4,
      "Job 4",
      "This is job 4",
      "1 Oct 2023 09:26:48"
    ]
  ]
}
