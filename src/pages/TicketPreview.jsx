
import { PDFViewer } from '@react-pdf/renderer';
import {DocumentPDF} from '../components/ui/DocumentPDF';
export default function TicketPreview() {


  return (
    <div className='w-full h-screen min-h-screen bg-black'>
      <h1 className='text-white'>Página de PDF</h1>
      <PDFViewer>
        <DocumentPDF />
      </PDFViewer>
    </div>
  );
}