import { useState } from 'react';
import { Share2, X } from 'lucide-react';

const blogsData = [
    {
        id: 1,
        title: "Why Do Our Dental Professionals Wear Scrubs?",
        author: "Dr Priyanka",
        date: "Aug 6, 2023",
        image: "/blog_images/dentist_assistant_scrubs.png",
        preview: "Having all staff wear scrubs is often a strategic tactic to communicate to patients a sense of professionalism that assists in building trust and aiding in the perception of cleanliness.",
        content: `Having all staff wear scrubs is often a strategic tactic to communicate to patients a sense of professionalism that assists in building trust and aiding in the perception of cleanliness. Additionally, it is an Occupational Safety and Health Administration requirement that proper garments be worn in the dental office to ensure worker safety.\n\nThe majority of respondents to the dress code survey said requiring scrubs or some other version of practice-specific apparel simplifies things for staff. Other respondents indicated that a uniform program: helps to prevent inappropriate dress (50%); promotes team unity (57%); promotes the practice’s brand and image (44%).\n\nScrubs not only help identify dental team personnel as health care professionals, but can help keep staff safer by enabling them to change from street clothes to work clothes and to leave their scrubs at the office at the end of their shift in case they are stained during patient treatment.`
    },
    {
        id: 2,
        title: "Personal Protective Equipment protocol in Root Square Dental Clinic",
        author: "Dr Priyanka",
        date: "Aug 7, 2023",
        image: "/blog_images/doctor_patient_ppe.png",
        preview: "PPEs are designed to protect the skin and the mucous membranes of the eyes, nose and mouth of dental practitioners from exposure to blood or other infectious materials.",
        content: `PPEs are designed to protect the skin and the mucous membranes of the eyes, nose and mouth of dental practitioners from exposure to blood or other infectious materials. This is mandatory in specified circumstances.\n\nUse of rotary dental and surgical instruments (e.g. hand-pieces or ultrasonic scalers) and air- water syringes creates a visible spray that contains primarily large- particle droplets of water, saliva, blood, microorganisms and other debris. This spatter travels only a short distance and settles down quickly, landing on the floor, nearby operatory surfaces, dental practitioners or the patient. The spray also might contain certain aerosols (i.e. particles of respirable size, < 10 µm) may remain airborne for extended periods and can be inhaled.\n\nPrimary PPE used in oral health-care settings includes gloves, surgical masks, protective eyewear, face shields and protective clothing (e.g. gowns and jackets).\n\nAll PPE should be removed before dental professionals leave patient- care areas.\n\nReusable PPE (e.g. clinician or patient protective eyewear and face shields) should be cleaned with soap and water when visibly soiled, disinfected between patients, according to the manufacturer's directions.\n\nWearing PPE reduces the risk of exposures to blood-borne pathogens.\n\nGeneral work clothes (e.g. uniforms, scrubs, pants and shirts) are neither intended to protect against a hazard nor considered PPE).\n\nDisposable Gloves\nHands are properly sanitized and dried before donning gloves. A new pair of gloves is worn for every patient. Gloves are even changed if they appear to be contaminated during the treatment.\n\nDisposable Caps\nWorn by Doctors and Dental Assistants throughout the day covering every inch of their hair. These are used in keeping aerosols from lodging on the hair, which may then be transferred to family members or onto inanimate objects.\n\nFace Masks\nThey work as protective shields and prevents splatters and aerosols from getting into contact with the mucous membranes of the nose and mouth. 3 ply Surgical Masks are used basis the type of treatment being done.\n\nProtective Eyewear\nProtective eyewear is worn by doctors whenever there is a possibility that a patient’s body fluids may splash or spray onto the face/eyes or an aerosol is being formed. Protective Eyewear is sanitised/sterilised after every use.\n\nProtective Clothing\nProtective clothing such as Scrubs prevent contamination of underlying clothing and protects from exposure to blood and body substances. Scrubs are worn by all Doctors throughout the day. They are then washed later in the evening.`
    },
    {
        id: 3,
        title: "How can day to day stress affect Oral Health?",
        author: "Dr Priyanka",
        date: "Aug 7, 2023",
        image: "/blog_images/7d8837_ffaf65377432493db8b46066834587fc~mv2.png.jpg",
        preview: "While you may know how stress impacts your energy, weight or digestion, you may not realize the sneaky ways that stress can compromise your oral health.",
        content: `Whether you are a struggling college student, a busy mom or someone trying to climb the corporate ladder, stress is nearly inevitable at every stage of life.\n\nWhile you may know how stress impacts your energy, weight or digestion, you may not realize the sneaky ways that stress can compromise your oral health.\n\nIf you consider yourself anxious or stressed more times than not, you’ll need to watch for these:\n\nTEETH GRINDING\nBruxism, or the grinding or clenching of teeth, is a common oral habit that is induced by stress. Whether you do it subconsciously during the day or while you sleep, bruxism can cause TMJ problems and enamel damage.\n\nDRY MOUTH\nDuring a stressful or “fight or flight” moment, your body may shift its fluids (saliva or sweat) to other parts of your body. It is common to experience more moisture in your sweat glands and less moisture in your mouth. A dry mouth is dangerous to your oral health because we need saliva to help wash away harmful bacteria and food debris that contributes to plaque formation.\n\nGUM DISEASE\nGum disease is not directly caused by your stress levels. However, chronic stress does weaken your immune system, which means your mouth is less equipped to fight off the bacteria that causes gum disease.\n\nMOUTH SORES\nDo you notice more frequent mouth sores when you’ve been on edge, anxious or stressed? Canker sores as well as a condition called lichen planus have been linked to stress. Lichen planus involves sores, ulcers, and white striations in the mouth.\n\nLET US HELP YOUR “STRESSED-OUT” SMILE\nWhile we can’t always control the amount of stress in your life, the dentists at ROOT SQUARE Dental are fully able and prepared to protect your dental health if your stress is impacting your smile. Call today to schedule your appointment in RSDC.`
    },
    {
        id: 4,
        title: "What to Expect from a Dental Consultation?",
        author: "Dr Priyanka",
        date: "Aug 8, 2023",
        image: "/blog_images/MagnoliaMarch-1024x768.jpg.optimal.jpg",
        preview: "When you are a new patient at a ROOT SQUARE DENTAL CLINIC, the first step is usually to schedule an initial consultation.",
        content: `When you are a new patient at a ROOT SQUARE DENTAL CLINIC, the first step is usually to schedule an initial consultation.\n\nA consultation is basically:\n- Assess your overall health\n- Evaluate your risk of tooth decay\n- Examine for root caries\n- Examine for gum disease (Periodontal disease)\n- Examine your jaw and bite for problems\n\nA good dentist won’t be judgmental or make you feel bad about your current dental health. He or she simply wants to help restore your teeth to the best possible condition, improving your health and well-being. But if you’re still feeling a little uncomfortable about that first appointment, it may help to know what to expect. Here’s what happens during a typical new patient dental consultation.\n\nPaperwork\nAnytime you visit a new office, you’ll be required to fill out some paperwork. They’ll want to know basic things like your name and address, as well as your health and dental history. Be sure to bring your insurance card with you if you have dental insurance. If you are transferring from a previous dentist’s office, call and request that your records be sent to the new office.\n\nDental Examination\nNext, you’ll be called back to an examination room for a dental exam. Associate dentist often performs the basic examination, making notes for the Senior dentist. Your teeth, gums, mouth, and jaw bone will be evaluated, looking for things like cavities, enamel erosion, and receding gums. The dentist will then perform a more thorough examination, also making notes in your file (most likely on a computer or tablet).\nIt’s important for your dentist to establish a baseline of your current dental health in order to make decisions about further treatment. If you are in need of fillings, crowns, implants, or other dental procedures, your dentist may prioritize needed work based on urgency.\n\nX-Rays\nYou can expect to have x-rays made of your teeth during that first visit. X-rays are another tool to gain information about your current dental health. The images show things that can’t be seen by the naked eye. For example, dark, shadowy areas in your teeth suggest cavities. The health of your jawbones can also be evaluated through x-ray images, which is a key factor when making decisions about the possibility of implants.\n\nConversation Between You and Your Dentist\nYour dentist will want to know what you hope to gain through dental treatment. Are you looking for better oral health? Do you hope to improve your appearance through teeth straightening, whitening, or other cosmetic dentistry? Your dentist will want to know why you are seeking dental care, and it’s best for you to be as honest as possible so that you are both on the same page and working toward the same goals.\n\nMaking a Plan for Further Treatment\nTaking into consideration the results of your examination and x-rays, as well as your dental goals, your dentist will formulate a treatment plan. This is an outline of the best course of action and the necessary steps to get the desired results. In some cases, the next steps may just be regular exams and cleanings. If you need more in-depth dental procedures, you may be scheduled for additional appointments.\n\nDiscussion of Finances and payment options\nOften, the fees you pay will be discussed at the time of your appointment as some are just a guideline. We also offer different Dental care Plan for preventive dentistry and festive offers.\n\nDon't hesitate to give us a call should you require any further information on the likely cost of your dental treatment.\n\nLooking for a New Dentist?\nDr. Priyanka Ramteke MDS Endodontist, provides advanced comprehensive dentistry in Santacruz , Mumbai . Contact us today to schedule your consultation: 8928187627`
    }
];

export default function Blogs() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    const handleShare = async (blog, platform = null) => {
        const url = window.location.href;
        const text = `Check out this blog post by ${blog.author}: ${blog.title}`;

        if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: blog.title,
                        text: text,
                        url: url,
                    });
                } catch (err) {
                    console.error('Share failed:', err);
                }
            } else {
                alert('Sharing is not supported on this browser. You can copy the URL manually.');
            }
        }
    };

    return (
        <section id="blogs" className="blogs">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Our Articles</span>
                    <h2>Latest Blogs & Insights</h2>
                    <p>Read the latest news and insights about dental health from our experts.</p>
                </div>

                <div className="blogs-grid">
                    {blogsData.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <div className="blog-image">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                            <div className="blog-content">
                                <span className="blog-date">{blog.date}</span>
                                <h3>{blog.title}</h3>
                                <p className="blog-author">By {blog.author}</p>
                                <p className="blog-preview">{blog.preview}</p>
                                <div className="blog-actions">
                                    <button className="btn-read-more" onClick={() => setSelectedBlog(blog)}>
                                        Read More
                                    </button>
                                    <button className="btn-share" onClick={() => handleShare(blog)} aria-label="Share">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Read More Modal */}
            {selectedBlog && (
                <div className="blog-modal-overlay" onClick={() => setSelectedBlog(null)}>
                    <div className="blog-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedBlog(null)}>
                            <X size={24} />
                        </button>
                        <img src={selectedBlog.image} alt={selectedBlog.title} className="modal-image" />
                        <div className="modal-content">
                            <span className="blog-date">{selectedBlog.date}</span>
                            <h2>{selectedBlog.title}</h2>
                            <p className="blog-author">By {selectedBlog.author}</p>
                            
                            <div className="modal-body">
                                {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="modal-share">
                                <span>Share this post:</span>
                                <div className="share-buttons">
                                    <button onClick={() => handleShare(selectedBlog, 'whatsapp')} aria-label="Share on WhatsApp">
                                        <i className="fa-brands fa-whatsapp" style={{fontSize: '20px'}}></i>
                                    </button>
                                    <button onClick={() => handleShare(selectedBlog, 'twitter')} aria-label="Share on Twitter">
                                        <i className="fa-brands fa-twitter" style={{fontSize: '20px'}}></i>
                                    </button>
                                    <button onClick={() => handleShare(selectedBlog, 'facebook')} aria-label="Share on Facebook">
                                        <i className="fa-brands fa-facebook-f" style={{fontSize: '20px'}}></i>
                                    </button>
                                    <button onClick={() => handleShare(selectedBlog)} aria-label="Share options">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
