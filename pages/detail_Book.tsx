"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter

interface ComicDetail {
    comicname: string;
    content: string;
    introimage?: string;
    type?: string;
    posteddate?: string;
    catalog: string;
    description?: string;
    chapters?: number;
}

export default function ProductDetail() {
    const router = useRouter();
    const { comicname } = router.query; // Lấy comicname từ URL
    const [comicDetail, setComicDetail] = useState<ComicDetail | null>(null);
    const [selectedModel, setSelectedModel] = useState("Chapter 1");
    const [showAllChapters, setShowAllChapters] = useState(false);
    const [relatedComics, setRelatedComics] = useState<ComicDetail[]>([]);

    // Fetch comic details
    useEffect(() => {
        if (!comicname || typeof comicname !== "string") return;

        const fetchComicDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/comicDetail/${comicname}`);
                if (!response.ok) throw new Error("Failed to fetch comic details");
                const data: ComicDetail = await response.json();
                setComicDetail(data);
            } catch (error) {
                console.error("Error fetching comic details:", error);
            }
        };

        fetchComicDetail();
    }, [comicname]);

    // Fetch related comics based on type
    useEffect(() => {
        if (!comicDetail || !comicDetail.type) return;

        const fetchRelatedComics = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/comicsByType/${comicDetail.type}`);
                if (!response.ok) throw new Error("Failed to fetch related comics");
                const data: ComicDetail[] = await response.json();
                setRelatedComics(data);
            } catch (error) {
                console.error("Error fetching related comics:", error);
            }
        };

        fetchRelatedComics();
    }, [comicDetail]);

    if (!comicDetail) {
        return <p>Loading...</p>;
    }

    const { content, introimage, type, posteddate, catalog, description, chapters } = comicDetail;
    const chapterList = Array.from({ length: chapters || 0 }, (_, i) => `Chapter ${i + 1}`);
    const visibleChapters = showAllChapters ? chapterList : chapterList.slice(0, 10);

    return (
        <div>
            <div className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="#">Comics</Link> /{" "}
                <Link href="#">{comicname}</Link>
            </div>
            <div className="product-detail-container">
                <div className="product-images">
                    {introimage && <Image src={introimage} ={comicname} width={300} height={400} />}
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
                            {visibleChapters.map((chapter, index) => (
                                <option key={index} value={chapter}>
                                    {chapter}
                                </option>
                            ))}
                            {!showAllChapters && (
                                <option value="showMore">Xem thêm...</option>
                            )}
                        </select>
                    </div>
                    <div className="product-attributes">
                        <p><strong>Genre:</strong> {catalog}</p>
                        <p><strong>Author:</strong> {type || "Unknown"}</p>
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
                <h3>Frequently Bought Together</h3>
                <div className="related-product-list">
                    {relatedComics.length > 0 ? (
                        relatedComics.map((relatedComic, index) => (
                            <div className="related-product-item" key={index}>
                                {relatedComic.introimage && (
                                    <Image
                                        src={relatedComic.introimage}
                                        alt={relatedComic.comicname}
                                        width={150}
                                        height={200}
                                    />
                                )}
                                <p>{relatedComic.comicname}</p>
                                <button className="btn btn-secondary">Read Now</button>
                            </div>
                        ))
                    ) : (
                        <p>No related comics available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
