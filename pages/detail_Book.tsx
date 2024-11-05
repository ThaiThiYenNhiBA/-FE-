"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
    const [selectedModel, setSelectedModel] = useState("Chapter 1");
    const [showAllChapters, setShowAllChapters] = useState(false);

    const chapters = [
        "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5",
        "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10",
        "Chapter 11", "Chapter 12", "Chapter 13", "Chapter 14", "Chapter 15"
    ];

    // Giới hạn hiển thị 10 chapter đầu tiên hoặc tất cả chapter
    const visibleChapters = showAllChapters ? chapters : chapters.slice(0, 10);

    return (
        <div>
            <div className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="#">Comics</Link> /{" "}
                <Link href="#">Conan</Link>
            </div>
            <div className="product-detail-container">
                <div className="product-images">
                    <Image src="/Images/OIP.png" alt="Case Santa Matryoshka" width={300} height={400} />
                </div>

                <div className="product-info">
                    <h2>Conan</h2>
                    <div className="product-status">
                        <span className="badge hot">Hot</span>
                    </div>
                    <div className="product-options">
                        <label htmlFor="chapter-list">Chapter List:</label>
                        <select
                            id="chapter-list"
                            value={selectedModel}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "showMore") {
                                    setShowAllChapters(true);
                                } else {
                                    setSelectedModel(value);
                                }
                            }}
                            className="w-full mt-2 p-2 border rounded"
                        >
                            {visibleChapters.map((chapter, index) => (
                                <option key={index} value={chapter}>
                                    {chapter}
                                </option>
                            ))}
                            {/* Thêm mục "Xem thêm" nếu chưa hiển thị toàn bộ chapters */}
                            {!showAllChapters && (
                                <option value="showMore">Xem thêm...</option>
                            )}
                        </select>
                    </div>
                    <div className="product-attributes">
                        <p><strong>Genre:</strong> Comics</p>
                        <p><strong>Author:</strong> Gosho Aoyama</p>
                        <p><strong>Publication Year:</strong> 19/1/1994</p>
                    </div>
                    <div className="product-features">
                        <p>Introducing Conan to our readers.</p>
                    </div>
                    <button className="btn btn-primary">Read Now</button>
                </div>
            </div>
            <div className="product-description">
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a posuere arcu, vitae dignissim tortor.</p>
                <button className="btn btn-secondary">Read Full Description</button>
            </div>
            <div className="related-products">
                <h3>Frequently Bought Together</h3>
                <div className="related-product-list">
                    <div className="related-product-item">
                        <Image src="/Images/OIP.png" alt="Related Product 1" width={150} height={200} />
                        <p>Doreamon</p>
                        <button className="btn btn-secondary">Read Now</button>
                    </div>
                    <div className="related-product-item">
                        <Image src="/Images/OIP.png" alt="Related Product 2" width={150} height={200} />
                        <p>Dragon Ball</p>
                        <button className="btn btn-secondary">Read Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
