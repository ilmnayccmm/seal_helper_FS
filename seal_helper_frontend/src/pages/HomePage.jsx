import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <style>{`
        /* Global Styles & Variables */
        .home-page-container {
          font-family: 'Georgia', serif; /* Serif font for headings similar to design */
          color: #333;
          overflow-x: hidden;
          background-color: #fcfcfc;
          background-image: radial-gradient(#e0e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }

        h2, h3 {
          color: #4a7596;
          text-align: center;
          font-weight: normal;
        }

        .sans-serif-text {
          font-family: 'Arial', sans-serif;
        }

        /* Generic Placeholders */
        .img-placeholder {
          background-color: #d0e0eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7a9cb5;
          font-family: 'Arial', sans-serif;
          font-size: 0.8rem;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        /* --- Hero Section --- */
        .hero-section {
          display: flex;
          justify-content: space-between;
          padding: 40px 5%;
          position: relative;
          min-height: 500px;
        }

        /* Left Hero - Yuki */
        .hero-left {
          position: relative;
          width: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .yuki-scallop-wrapper {
          position: relative;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 4px dashed #9bc4df;
          padding: 15px;
          background: white;
        }

        .yuki-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #b5d5e9;
          border: 2px dashed #9bc4df;
        }

        .speech-bubble {
          background: #e6f2fa;
          border-radius: 20px;
          padding: 15px 20px;
          text-align: center;
          margin-top: 20px;
          position: relative;
          width: 220px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .speech-bubble::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 10px 10px 10px;
          border-style: solid;
          border-color: transparent transparent #e6f2fa transparent;
        }
        .speech-bubble p { margin: 0; font-size: 0.9rem; }
        .speech-bubble a { color: #4a7596; text-decoration: none; display: block; margin-top: 5px;}

        .accent-lines {
          position: absolute;
          top: -20px;
          right: 40px;
          width: 60px;
          height: 60px;
        }

        /* Right Hero - Letter & Report */
        .hero-right {
          width: 55%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .letter-graphic {
          background: #fdfaf0;
          padding: 40px;
          width: 80%;
          min-height: 250px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transform: rotate(2deg);
          text-align: center;
          border: 1px solid #eaddcc;
          position: relative;
          z-index: 1;
        }
        .letter-graphic p { font-size: 1.1rem; line-height: 1.4; color: #333;}

        .floating-img-1 {
          position: absolute;
          top: -30px;
          right: -20px;
          width: 120px;
          height: 80px;
          border: 4px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transform: rotate(5deg);
          z-index: 2;
        }

        .floating-img-2 {
          position: absolute;
          bottom: -30px;
          left: 20px;
          width: 100px;
          height: 80px;
          border: 4px dotted #fdfaf0;
          background: #e0d5c1;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transform: rotate(-5deg);
          z-index: 2;
        }

        .report-section {
          position: absolute;
          right: -20px;
          top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 3;
        }

        .phone-wire {
          width: 2px;
          height: 100px;
          background: #e74c3c;
          margin-bottom: -10px;
        }

        .report-button {
          background: #d4a362;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          padding: 30px 20px;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 120px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          border: 3px solid #8b6b42; /* Fallback for outline */
          cursor: pointer;
          transition: transform 0.2s;
        }
        .report-button:hover { transform: scale(1.05); }

        /* --- Mission Banner --- */
        .mission-banner {
          background-color: #7b9cb6;
          color: white;
          padding: 40px 10%;
          position: relative;
          margin-top: 50px;
          text-align: center;
        }
        .mission-banner p {
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-size: 1.1rem;
          position: relative;
          z-index: 2;
        }
        
        .seal-cutout {
          position: absolute;
          bottom: 0;
          right: 15%;
          width: 200px;
          height: 300px;
          background: #5a7b96; /* Darker placeholder */
          border-radius: 100px 100px 0 0;
          z-index: 1;
        }

        .decorative-border {
          height: 15px;
          background-image: repeating-linear-gradient(45deg, #d4a362 25%, transparent 25%, transparent 75%, #d4a362 75%, #d4a362), repeating-linear-gradient(45deg, #d4a362 25%, #fdfaf0 25%, #fdfaf0 75%, #d4a362 75%, #d4a362);
          background-position: 0 0, 10px 10px;
          background-size: 20px 20px;
        }

        /* --- Meet the Seals --- */
        .meet-seals {
          padding: 60px 5%;
        }
        .meet-seals h2 { font-size: 2.5rem; margin-bottom: 40px; }

        .seals-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .seal-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cloud-frame {
          border: 2px dashed #9bc4df;
          background: #f0f7fb;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .cloud-frame-small {
          width: 180px;
          height: 140px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }
        .cloud-frame-large {
          width: 300px;
          height: 220px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }

        .seal-img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #c3dbe8;
        }

        .seal-name {
          font-family: 'Arial Black', sans-serif;
          font-size: 1.8rem;
          color: white;
          -webkit-text-stroke: 1px #4a7596;
          text-shadow: 2px 2px 0 #4a7596;
          margin-top: -15px;
          z-index: 2;
          text-transform: uppercase;
        }
        .seal-name.large { font-size: 2.5rem; }

        /* --- What We Do --- */
        .what-we-do {
          display: flex;
          padding: 60px 10%;
          align-items: center;
          gap: 50px;
        }
        .what-we-do-left { width: 50%; position: relative; }
        .what-we-do-right { width: 50%; }

        .video-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: #d4e4ee;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .timestamp {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 8px;
          border-radius: 5px;
          font-size: 0.8rem;
          font-family: sans-serif;
        }

        .blob-bg-1, .blob-bg-2 {
          position: absolute;
          background: #8ab6d6;
          border-radius: 50%;
          z-index: 1;
        }
        .blob-bg-1 { width: 150px; height: 150px; top: -30px; left: -30px; }
        .blob-bg-2 { width: 200px; height: 100px; bottom: -20px; right: 20px; border-radius: 100px; }

        .what-we-do-right h2 { text-align: left; font-size: 2.5rem; margin-bottom: 20px; }
        .what-we-do-right p { line-height: 1.6; color: #555; margin-bottom: 15px; }

        .small-graphic {
          width: 150px;
          height: 80px;
          background: #ccdce6;
          border-radius: 40px 40px 10px 10px;
          margin-top: 20px;
          float: right;
          position: relative;
        }
        .zig-zag {
          position: absolute;
          top: -20px;
          right: -10px;
          color: #e74c3c;
          font-size: 2rem;
          font-weight: bold;
        }

        /* --- Rules Section --- */
        .rules-section {
          padding: 60px 10%;
          text-align: center;
        }
        .rules-section h2 { font-size: 2rem; margin-bottom: 40px; }
        
        .rules-grid {
          display: flex;
          justify-content: space-between;
          gap: 30px;
        }

        .rule-card {
          background: #a9cfdf;
          color: white;
          padding: 30px 20px;
          border-radius: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .rule-card h3 { color: white; margin-bottom: 15px; font-size: 1.5rem; }
        .rule-card p { font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; }

        .icon-dashed { border-bottom: 3px dashed white; width: 60px; height: 30px; border-radius: 50% 50% 0 0; }
        .icon-x { font-size: 3rem; font-weight: bold; line-height: 1; color: #7a9cb5; }
        .icon-cross { font-size: 3rem; font-weight: bold; line-height: 1; color: #7a9cb5;}


        /* --- Impact Numbers --- */
        .impact-section {
          padding: 60px 10%;
          background: #f4f9fb;
        }
        .impact-section h2 { font-size: 1.8rem; margin-bottom: 40px; }

        .numbers-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          text-align: center;
        }
        
        .number-item h4 {
          font-size: 2.5rem;
          color: #3b6585;
          margin: 0 0 10px 0;
          font-family: 'Arial Black', sans-serif;
        }
        .number-item p { margin: 0; font-size: 0.9rem; color: #555; line-height: 1.3; }


        /* --- Education Section --- */
        .education-section {
          padding: 80px 10%;
          display: flex;
          align-items: center;
          gap: 50px;
          background: repeating-radial-gradient( circle at 0 0, transparent 0, #fcfcfc 40px ), repeating-linear-gradient( #eef5f9, #eef5f9 );
        }

        .polaroid-container {
          width: 50%;
          position: relative;
          min-height: 400px;
        }

        .polaroid {
          background: white;
          padding: 15px 15px 40px 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          position: absolute;
          width: 250px;
        }
        .polaroid-1 { top: 0; left: 10%; transform: rotate(-5deg); z-index: 2; }
        .polaroid-2 { bottom: 0; right: 10%; transform: rotate(10deg); z-index: 1; }

        .polaroid-img {
          width: 100%;
          height: 180px;
          background: #c3dbe8;
        }

        .education-text {
          width: 50%;
          text-align: center;
        }
        .education-text h2 { font-size: 2.5rem; line-height: 1.2; margin-bottom: 20px;}
        .education-text p { margin-bottom: 15px; line-height: 1.6; color: #555;}
        .education-text a { color: #4a7596; text-decoration: underline; }

        /* Scalloped Divider */
        .scallop-divider {
          height: 20px;
          background-size: 40px 40px;
          background-image: radial-gradient(circle at 20px 0, transparent 20px, white 21px);
          margin-top: -10px;
          position: relative;
          z-index: 10;
        }

        /* --- Responsive Design --- */
        @media (max-width: 900px) {
          .hero-section, .what-we-do, .education-section { flex-direction: column; }
          .hero-left, .hero-right, .what-we-do-left, .what-we-do-right, .polaroid-container, .education-text { width: 100%; }
          .hero-right { margin-top: 50px; }
          .rules-grid { flex-direction: column; }
          .numbers-grid { grid-template-columns: repeat(3, 1fr); gap: 40px 20px; }
          .polaroid-container { min-height: 600px; display: flex; justify-content: center; }
          .polaroid { position: relative; margin-bottom: -100px; }
          .polaroid-1 { top: 0; left: 0; }
          .polaroid-2 { top: 0; right: 0; }
        }
        @media (max-width: 600px) {
          .numbers-grid { grid-template-columns: repeat(2, 1fr); }
          .seals-grid { flex-direction: column; }
        }
      `}</style>

      {/* --- HERO SECTION --- */}

      {/* --- MISSION BANNER --- */}
      {/* --- MEET THE SEALS --- */}
      {/*<div className="decorative-border"></div>*/}
      <section className="meet-seals">
        <h2>MEET THE SEALS!</h2>
        <div className="seals-grid">
          <div className="seal-card">
            <div className="cloud-frame cloud-frame-small">
              <div className="seal-img img-placeholder">
                  <img src={"/images/ponsuke.png"} style={{'height': "130px"}}/>
              </div>
            </div>
            <div className="seal-name">PONSUKE</div>
          </div>

          <div className="seal-card">
            <div className="cloud-frame cloud-frame-large">
              <div className="seal-img img-placeholder">
                <img src={"/images/kyoro.png"} style={{'height': "220px", "margin": "50px 0 0 0"}}/>
              </div>
            </div>
            <div className="seal-name large">KYORO</div>
          </div>

          <div className="seal-card">
            <div className="cloud-frame cloud-frame-small">
              <div className="seal-img img-placeholder">
                <img src={"/images/hiyori.png"} style={{'height': "150px", "margin": "30px 0 0 0"}}/>
              </div>
            </div>
            <div className="seal-name">HIYORI</div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO --- */}
      <section className="what-we-do">
        <div className="what-we-do-left">
          <div className="blob-bg-1"></div>
          <div className="blob-bg-2"></div>
          <div className="video-placeholder">
            <span>Video Placeholder (Seal in Snow)</span>
            <div className="timestamp">1:30</div>
          </div>
        </div>

        <div className="what-we-do-right">
          <h2>What We Do</h2>
          <div className="sans-serif-text">
            <p>
              Seal Helper is working toward a world where seals and
              marine life can flourish in healthy oceans across the
              globe. Through research, rescue, and community action,
              we strive to protect these remarkable creatures and the
              ecosystems they depend on.
            </p>
            <p>
              Seals play a vital role in maintaining the balance of
              marine environments, yet many species face increasing
              threats from pollution, climate change, and human
              activity. At Seal Helper, we believe that every seal matters
              — and that protecting them means protecting the planet.
            </p>
            <p>
              By monitoring sightings, recording behaviors, and
              supporting conservation efforts worldwide, we're helping
              to build a global understanding of seal populations. Each
              seal has its own story, and with every piece of data, we
              move closer to ensuring a safe, thriving future for them
              and for our oceans.
            </p>
          </div>

        </div>
      </section>

      {/* --- WHAT TO DO IF YOU SEE A SEAL --- */}
      <section className="rules-section">
        <h2>WHAT TO DO IF YOU SEE A SEAL?</h2>
        <div className="rules-grid">

          <div className="rule-card">
            <h3>RESPECT</h3>
            <p className="sans-serif-text">
              Do not disturb seals. Observe them from
              a safe distance, 100m is advised. This is a
              safe distance to ensure seals do not
              become stressed.
            </p>
            <div className="icon-dashed"></div>
          </div>

          <div className="rule-card">
            <h3>CAUTION</h3>
            <p className="sans-serif-text">
              Never touch or try to feed seals, they are
              wild animals and can bite if stressed,
              mothers can abandon pups if continually
              approached by people.
            </p>
            <div className="icon-x">✖</div>
          </div>

          <div className="rule-card">
            <h3>LEAVE SEALS BE</h3>
            <p className="sans-serif-text">
              Do not put the seal in the water or try to
              herd a seal into the water. Seals are on
              land for a reason! Seals need to rest on
              land to digest, care for young and
              socialise. New born pups and injured
              and sick pups are on land to rest, recover
              & grow.
            </p>
          </div>

        </div>
      </section>

      <div className="scallop-divider"></div>

      {/* --- IMPACT NUMBERS --- */}
      <section className="impact-section">
        <h2>2025 Impact Numbers</h2>
        <div className="numbers-grid">
          <div className="number-item">
            <h4>228</h4>
            <p>Seals Rescued</p>
          </div>
          <div className="number-item">
            <h4>103</h4>
            <p>Seals Released</p>
          </div>
          <div className="number-item">
            <h4>40.000+</h4>
            <p>People Reached<br/>Through our<br/>Education Programme</p>
          </div>
          <div className="number-item">
            <h4>436</h4>
            <p>New Rescue<br/>Volunteers</p>
          </div>
          <div className="number-item">
            <h4>44</h4>
            <p>Beach Cleans</p>
          </div>
          <div className="number-item">
            <h4>79</h4>
            <p>Internship Programme<br/>Participants</p>
          </div>
        </div>
      </section>

      <div className="scallop-divider"></div>
        <section className="mission-banner">
        <p className="sans-serif-text">
          Seals are vital indicators of the marine environment's health
          and we feel extremely fortunate to share our shores with
          these enigmatic, intelligent and inquisitive creatures. We
          are passionate in playing our part in reducing the growing
          threats from pollution and human disturbance and
          safeguarding these incredible marine mammals for future
          generations.
        </p>
      </section>
      <div className="scallop-divider"></div>

      {/* --- EDUCATION --- */}
      <section className="education-section">
        <div className="polaroid-container">
          <div className="polaroid polaroid-1">
            <div className="polaroid-img img-placeholder">
              <img src={"/images/seal1.png"} style={{'height': "220px"}}/>
            </div>
          </div>
          <div className="polaroid polaroid-2">
            <div className="polaroid-img img-placeholder" style={{background: '#9ec9aa'}}>
              <img src={"/images/seal2.png"} style={{'height': "220px", "margin": "-10px 30px 0 0"}}/>
            </div>
          </div>
        </div>

        <div className="education-text">
          <h2>Education,<br/>Awareness & Talks</h2>
          <div className="sans-serif-text">
            <p>
              Raising awareness is a key part of our mission. We can
              deliver interactive workshops, school visits, and public
              talks to educate people of all ages about the importance
              of seals.
            </p>
            <p>
              Through sharing our knowledge and stories, we
              inspire communities to adopt behaviours that protect
              seals and their environments. If you would like to
              book a talk please get in touch.
            </p>
            <p>
              We ask for a minimum donation to the charity in
              return for our time depending on the travelling
              distance.
            </p>
            <p>
              Please get in touch for availability for talks or
              presentations.
            </p>
            <a href="#">Read more-&gt;</a>
          </div>
        </div>
      </section>

      {/* Ends here before the existing 'Join our team / Footer' section as requested */}
    </div>
  );
};

export default HomePage;