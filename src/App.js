import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Whitepaper from "./Whitepaper/Whitepaper";
import AppComponent from "./CommonComponents/AppComponent";
import Library from "./Library/Library";
import OldHome from "./Old_Home/Old_Home";
import Marketplace from "./MarketPlace/Marketplace";

export default function App() {
  return (
    <>
      <div className="main">
        <Routes>
          <Route
            path="/old-home"
            element={
              <AppComponent>
                <OldHome />
              </AppComponent>
            }
          />
          <Route
            path=""
            element={
              <AppComponent>
                <Home />
              </AppComponent>
            }
          />
          <Route
            path="/whitepaper"
            element={
              <AppComponent>
                <Whitepaper />
              </AppComponent>
            }
          />
          <Route
            path="/library"
            element={
              <AppComponent>
                <Library />
              </AppComponent>
            }
          />
          <Route
            path="/marketplace"
            element={
              <AppComponent>
                <Marketplace />
              </AppComponent>
            }
          />
        </Routes>
      </div>
    </>
  );
}
////code to upload and download books for testing purpose use the reference below to integrate
/**
 * import React, { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import bookStorageABI from "./BookStorageABI.json";
import { Buffer } from "buffer";

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_API_SECRET;

const ipfs = create({
  host: "api.pinata.cloud",
  port: 443,
  protocol: "https",
  apiPath: "/pinning/v1/add",
  headers: {
    "Content-Type": "application/json",
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataSecretApiKey,
  },
});
const contractAddress = process.env.CONTRACT_ADDRESS;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, BookStorageABI, signer);

  const handleFileUpload = async () => {
    console.log("hi");
    if (!pdfFile) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        BookStorageABI,
        signer
      );

      const pdfBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(Buffer.from(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(pdfFile);
      });

      const formData = new FormData();
      formData.append(
        "file",
        new Blob([pdfBuffer], { type: "application/pdf" })
      );

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            Authorization: `Bearer ${process.env.PINATA_JWT_TOKEN}`,
          },
          body: formData,
        }
      );
      console.log("response is", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading to IPFS to piniata:", errorData);
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const { IpfsHash } = await response.json();
      setIpfsHash(IpfsHash);

      console.log(",contract", contract);
      const tx = await contract.connect(signer).storeBookCID(IpfsHash);

      await tx.wait(1);
      console.log("upload", tx);
      alert("PDF uploaded and CID stored in smart contract");
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert(
        "Failed to upload PDF to IPFS. Please check the console for more details."
      );
    }
  };


  const handleRetrieve = async () => {
    try {
      const [users, cids] = await contract.getAllBooks();
      console.log("books", cids);

      const books = cids.map((cid) => ({
        cid,
      }));
      console.log("books", books);
      setAllBooks(books);

      // Fetch and display each book in PDF format
      await Promise.all(
        books.map(async (book) => {
          const response = await fetch(
            `https://gateway.pinata.cloud/ipfs/${book.cid}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
        })
      );
    } catch (error) {
      console.error("Error retrieving all book CIDs:", error);
      alert(
        "Failed to retrieve all book CIDs. Please check the console for more details."
      );
    }
  };
  const handleDownload = async (cid) => {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_book.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(
        "Failed to download PDF. Please check the console for more details."
      );
    }
  };

  return (
    <div className="App">
      <h1>Upload and Download PDF via IPFS and Smart Contract</h1>
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload PDF</button>
      </div>
      <div className="retrieve-container">
        <button onClick={handleRetrieve}>Retrieve All Books</button>
      </div>
      <div className="book-list">
        {allBooks.map((book, index) => (
          <div key={index} className="book-item">
            <p>CID: {book.cid}</p>
            <button onClick={() => handleDownload(book.cid)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

 */
