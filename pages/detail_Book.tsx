"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface RelatedComic {
    comicname: string;
    image: string;
}

interface ComicDetail {
    comicname: string;
    comicauthor: string[];
    content: string;
    type: string;
    image?: string;
    posteddate?: string;
    catalog: string;
    description: string;
    chapters: string[];
    relatedComic: RelatedComic[];
}

export default function ProductDetail() {
    const [comicDetail, setComicDetail] = useState<ComicDetail | null>(null);
    const [selectedModel, setSelectedModel] = useState("Chapter 1");
    const [showAllChapters, setShowAllChapters] = useState(false);

    useEffect(() => {
        const fetchComicDetail = async () => {
            try {
                const response = await fetch("http://localhost:8082/api/comicDetail/Batman");
                if (!response.ok) throw new Error("Failed to fetch comic details");
                const data: ComicDetail = await response.json();
                setComicDetail(data);
            } catch (error) {
                console.error("Error fetching comic details:", error);
            }
        };

        fetchComicDetail();
    }, []);

    if (!comicDetail) {
        return <p>Loading...</p>;
    }

    const { comicname, content, image, type, posteddate, catalog, description, chapters, relatedComic } = comicDetail;

    const chapterList = Array.from({ length: chapters.length || 0 }, (_, i) => `Chapter ${i + 1}`);
    const visibleChapters = showAllChapters ? chapterList : chapterList.slice(0, 10);

    return (
        <div>
            <div className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="#">Comics</Link> /{" "}
                <Link href="#">{comicname}</Link>
            </div>
            <div className="product-detail-container">
                <div className="product-images">
                    {image && <Image src={image} alt={comicname} width={300} height={400} />}
                </div>

                <div className="product-info">
                    <h2>{comicname}</h2>
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
                            {chapters.map((chapter, index) => (
                                <option key={index} value={chapter}>
                                    {chapter}
                                </option>
                            ))}

                            {!showAllChapters && (
                                <option value="showMore">See More...</option>
                            )}
                        </select>
                    </div>
                    <div className="product-attributes">
                        <p><strong>Genre:</strong> {type}</p>
                        <p><strong>Author:</strong> {comicDetail.comicauthor.length > 0 ? comicDetail.comicauthor.join(", ") : "Unknown"}</p>
                        <p><strong>Publication Year:</strong> {posteddate || "N/A"}</p>
                    </div>
                    <div className="product-features">
                        <p>{content}</p>
                    </div>
                    <button className="btn btn-primary">Read Now</button>
                </div>
            </div>
            <div className="product-description">
                <h3>Description</h3>
                <p>{description}</p>
                <button className="btn btn-secondary">Read Full Description</button>
            </div>
            <div className="related-products">
                <h3>Related Comics</h3>
                <div className="related-product-list">
                    {relatedComic.map((comic, index) => (
                        <div className="related-product-item" key={index}>
                            <Image src={comic.image} alt={comic.comicname} width={150} height={200} />
                            <p>{comic.comicname}</p>
                            <button className="btn btn-secondary">Read Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
