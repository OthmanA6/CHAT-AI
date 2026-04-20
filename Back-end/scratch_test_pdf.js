import { PDFParse } from 'pdf-parse';
console.log('Type of PDFParse:', typeof PDFParse);
try {
    const pdf = new PDFParse(Buffer.from("dummy"));
    console.log('PDFParse is a constructor');
    console.log('Methods on pdf instance:', Object.getOwnPropertyNames(Object.getPrototypeOf(pdf)));
} catch (e) {
    console.log('PDFParse is NOT a simple constructor or failed:', e.message);
}
