import React, { useState, useEffect } from "react";

const ImageUpLoad = (props) => {
    const { setImage, Image } = props;
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    const onImageChange = (e) => {
        setImages([...e.target.files]);
        setImage([e.target.files]);
    }

    return (
        <>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />
            <div style={{ display: 'flex', gap: 8 }}>
                {imageURLS.map((imageSrc, index) => (
                    <img src={imageSrc} key={index} alt="not fount" id="previewImage" />
                ))}
            </div>
        </>
    );
};

export default ImageUpLoad;