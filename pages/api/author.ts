import type { NextApiRequest, NextApiResponse } from 'next';

interface AuthorData {
  fullname: string;
  email: string;
  createdDate: string;
  userName: string;
  authorName: string; // Thêm trường authorName
  type: string; // Thêm trường type
}

// Hàm xử lý yêu cầu
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthorData | { message: string }>
) {
  if (req.method === 'GET') {
    // Dữ liệu giả định, có thể lấy từ cơ sở dữ liệu
    const authorData: AuthorData = {
      fullname: "Christenson",
      email: "Christenson@gmail.com",
      createdDate: "2023-01-01",
      userName: "Chris12",
      authorName: "Some Author", // Thay đổi theo dữ liệu thực tế
      type: "Comic", // Thay đổi theo dữ liệu thực tế
    };

    res.status(200).json(authorData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}