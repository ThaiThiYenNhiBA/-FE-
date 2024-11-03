"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
    const [selectedModel, setSelectedModel] = useState("iPhone 7");

    return (
        <div>
            <div className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="#">Comics</Link> /{" "}
                <Link href="#">Conan</Link>
            </div>
            <div className="product-detail-container">
                <div className="product-images">
                    <Image src="/Images/OIP.png" alt="Case Santa Matryoshka" width={300} height={400} />
                    {/* <div className="thumbnail-images">
                        <Image src="/Images/OIP.png" alt="Thumbnail 1" width={50} height={50} />
                        <Image src="/Images/OIP.png" alt="Thumbnail 2" width={50} height={50} />
                    </div> */}
                </div>

                <div className="product-info">
                    <h2>Conan</h2>
                    <div className="product-status">
                        <span className="badge hot">Hot</span>
                    </div>
                    <div className="product-options">
                        <label htmlFor="phone-model">Chapter List:</label>
                        <select
                            id="phone-model"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            <option>Chapter 1</option>
                            <option>Chapter 2</option>
                            <option>Chapter 3</option>
                            <option>Chapter 4</option>
                            <option>Chapter 5</option>
                            <option>Chapter 6</option>
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
