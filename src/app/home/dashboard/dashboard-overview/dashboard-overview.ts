import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { Header } from '../../../services/header';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-overview',
   imports: [CommonModule],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css',
})
export class DashboardOverview {
    @ViewChild('userChart') userChartRef!: ElementRef;
  private router = inject(Router)
  private headerService = inject(Header)

  users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Pending' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Editor', status: 'Active' },
  ];


  totalUsers = 1250;
  activeUsers = 890;
  inactiveUsers = 360;


    renderChart() {
      const ctx = this.userChartRef.nativeElement.getContext('2d');
  
      new Chart(ctx, {
        type: 'line', // Line chart for trends
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'New User Registrations',
            data: [12, 19, 3, 5, 2, 30],
            borderColor: '#0d6efd', // Bootstrap Primary Blue
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4 // Smooth curves
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false } // Hide legend for a cleaner look
          },
          scales: {
            y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  ngOnInit() {
  
    this.headerService.setTitle('Dashboard Overview');
  }
   ngAfterViewInit(): void {
    this.renderChart();
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
  
   
      try {
       
        const logoUrl = 'https://placehold.co/150x150/0d6efd/ffffff.png?text=LOGO';
        const imgData = await this.getBase64ImageFromUrl(logoUrl);
        
       
        doc.addImage(imgData, 'PNG', 15, 10, 25, 25);
      } catch (error) {
        console.error('Could not load logo:', error);
     
        doc.setFillColor(13, 110, 253);
        doc.rect(15, 10, 25, 25, 'F');
      }
  
 
      doc.setFontSize(22);
      doc.setTextColor(40); 
      doc.text('Monthly User Report', 50, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100); 
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 28);
  
  
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
        startY: 40, 
        theme: 'grid',
        headStyles: { fillColor: [13, 110, 253] }, 
        styles: { fontSize: 10, cellPadding: 3 },
      });
  

      doc.save('user-report.pdf');
    }

    createNewUser() {
      this.router.navigate(['/dashboard/user'])
  }
}
