import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Header } from '../../services/header';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
Chart.register(...registerables); 

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

    headerService = inject(Header);
  // Mock Data for the User List
  users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Pending' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Editor', status: 'Active' },
  ];

  // Stats for the top cards
  totalUsers = 1250;
  activeUsers = 890;
  inactiveUsers = 360;

  constructor() {}

  ngOnInit(): void {}





  // Placeholder for "Create User" action
  createNewUser() {
    console.log('Open Create User Modal');
  }

private async getBase64ImageFromUrl(url: string): Promise<string> {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async downloadPDF() {
    const doc = new jsPDF();

    // --- LOGO SECTION ---
    try {
      // Using a dummy logo from Placehold.co (CORS friendly)
      const logoUrl = 'https://placehold.co/150x150/0d6efd/ffffff.png?text=LOGO';
      const imgData = await this.getBase64ImageFromUrl(logoUrl);
      
      // Add Image: (image, format, x, y, width, height)
      doc.addImage(imgData, 'PNG', 15, 10, 25, 25);
    } catch (error) {
      console.error('Could not load logo:', error);
      // Fallback if image fails: Draw a blue square
      doc.setFillColor(13, 110, 253);
      doc.rect(15, 10, 25, 25, 'F');
    }

    // --- TITLE SECTION ---
    doc.setFontSize(22);
    doc.setTextColor(40); // Dark Grey
    doc.text('Monthly User Report', 50, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100); // Light Grey
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 28);

    // --- TABLE SECTION ---
    const tableBody = this.users.map(user => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status
    ]);

    autoTable(doc, {
      head: [['ID', 'Name', 'Email', 'Role', 'Status']],
      body: tableBody,
      startY: 40, // Start below the logo
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }, // Bootstrap Primary Blue
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // --- SAVE FILE ---
    doc.save('user-report.pdf');
  }
}
