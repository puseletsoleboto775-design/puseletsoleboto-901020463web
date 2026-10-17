export default function Footer(){
  const year: number = new Date().getFullYear();
  return (
    <footer className="main-footer-bw">
      <div className="footer-grid">
        <div><p><strong>STUDENT PORTFOLIO</strong></p>
        <p className="small">Student: Puseletso leboto</p>
        <p className="small">ID: 901020463</p></div>
        <div className="right"><p><strong>LIMKOKWING UNIVERSITY</strong></p>
        <p className="small">Maseru, Lesotho - {year}</p>
        <p className="small">Tel: +266 2231 5700</p>
        <p className="small">lesotho@limkokwing.edu.my</p></div>
      </div>
      <div className="footer-bottom-bw"><p>© {year} LUCT - All Rights Reserved - Contact: +266 2231 5700</p></div>
    </footer>
  );
}
