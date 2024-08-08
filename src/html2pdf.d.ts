declare module 'html2pdf.js' {
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';

  export function html2pdf(element: HTMLElement, options?: any): any;
  export default html2pdf;
}