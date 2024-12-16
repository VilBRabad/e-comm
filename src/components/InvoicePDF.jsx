import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LiaFileInvoiceSolid } from "react-icons/lia";

const InvoicePDF = ({ orderId }) => {
  const navigate = useNavigate();
  if (!orderId) navigate(-1);


  const [product, setProduct] = useState(undefined);
  // const [user, setUser] = useState(undefined);
  const generateInvoicePDF = async () => {
    const doc = new jsPDF();

    try {
      const res = await axios.get(`http://127.0.0.1:5000/get-invoice-details?orderId=${orderId}`,)
      const data = res.data;
      setProduct(data.order);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const res = error.response;
        window.alert(res.data.error);
      }
      else window.alert("Something went wrong!");
      return;
    }

    // Invoice Header
    doc.setFontSize(16);
    doc.text('Invoice', 105, 15, null, null, 'center');
    doc.setFontSize(12);
    doc.text(product?.seller?.shop_name, 15, 44);
    doc.text(`${product?.seller?.address} - ${product?.seller?.pincode}`, 15, 51);
    doc.text(`Email: ${product?.seller?.email}`, 15, 58);

    // Invoice Info
    const dateOnly = new Date(product?.created_at)?.toISOString().split('T')[0];

    const invoiceData = {
      invoiceNumber: `INV-${orderId.slice(0, 8)}`,
      date: dateOnly,
      customerName: product?.address?.name,
      customerAddress: `${product?.address?.address} - ${product?.address?.pincode}`,
      mobileNumber: `${product?.address?.mobile_number}`,
    };

    doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 140, 30);
    doc.text(`Date: ${invoiceData.date}`, 140, 37);
    // doc.text(`Due Date: ${invoiceData.dueDate}`, 140, 44);

    // Customer Details
    doc.text('Bill To:', 15, 70);
    doc.text(`Name: ${invoiceData.customerName}`, 15, 77);
    doc.text(`Address: ${invoiceData.customerAddress}`, 15, 84);
    doc.text(`Mobile No.: ${invoiceData.mobileNumber}`, 15, 91);

    // Itemized Table
    const items = [
      { description: product?.product?.title, quantity: product?.quantity, price: product?.product?.price, total: product?.total_price },
    ];

    const tableData = items.map((item) => [
      item.description,
      item.quantity,
      `Rs. ${new Intl.NumberFormat('en-IN').format(item.price.toFixed(2))}`,
      `Rs. ${new Intl.NumberFormat('en-IN').format(item.total.toFixed(2))}`,
    ]);

    doc.autoTable({
      head: [['Description', 'Quantity', 'Price', 'Total Price']],
      body: tableData,
      startY: 100,
    });

    // Calculate Total
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    // Footer with Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Grand Total: Rs. ${new Intl.NumberFormat('en-IN').format(grandTotal.toFixed(2))}`, 140, finalY);

    // Footer Section
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, finalY + 20, null, null, 'center');
    doc.text('If you have any questions about this invoice, contact us at info@ecomm.com.', 105, finalY + 27, null, null, 'center');

    // Save the PDF
    doc.save('Invoice.pdf');
  };

  return (
    <div>
      <button
        onClick={generateInvoicePDF}
        className='absolute right-0 -bottom-4 px-3 py-1 border border-black rounded-xl text-xs flex gap-2 items-center'
      >
        <LiaFileInvoiceSolid size={18} />
        <p>Download Invoice</p>

      </button>
    </div>
  );
};

export default InvoicePDF;
