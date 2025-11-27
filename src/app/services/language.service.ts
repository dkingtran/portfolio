import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'de';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLangSubject = new BehaviorSubject<Language>(this.getInitialLanguage());
    public currentLang$ = this.currentLangSubject.asObservable();

    private translations: { [key: string]: { en: string; de: string } } = {
        'nav.aboutMe': { en: 'About me', de: 'Über mich' },
        'nav.skills': { en: 'Skills', de: 'Fähigkeiten' },
        'nav.projects': { en: 'Projects', de: 'Projekte' },
        'hero.title': { en: 'Frontend Developer', de: 'Frontend Entwickler' },
        'hero.checkWork': { en: 'Check my Work', de: 'Meine Projekte' },
        'hero.contact': { en: 'Contact me', de: 'Kontakt' },
        'hero.marquee1': { en: 'Available for remote work', de: 'Verfügbar für Remote-Arbeit' },
        'hero.marquee2': { en: 'Frontend Developer', de: 'Frontend Entwickler' },
        'hero.marquee3': { en: 'Based in Augsburg', de: 'Ansässig in Augsburg' },
        'hero.marquee4': { en: 'Open to work', de: 'Offen für Arbeit' },
        'about.subtitle': { en: 'Who I am', de: 'Wer ich bin' },
        'about.title': { en: 'About me', de: 'Über mich' },
        'about.intro': { en: "Hey there, I'm Dennis! I write front-end code that prioritises clarity and reliability. I turn product requirements into straightforward, testable components and focus on performance and maintainability.", de: 'Hey, ich bin Dennis! Ich schreibe Frontend‑Code, der Klarheit und Zuverlässigkeit in den Mittelpunkt stellt. Ich übersetze Anforderungen in gut testbare Komponenten und achte auf Performance und Wartbarkeit.' },
        'about.location': { en: 'Based in Augsburg. I am open to remote work and collaboration on focused projects.', de: 'Ansässig in Augsburg. Ich bin offen für Remote‑Arbeit und Zusammenarbeit an gezielten Projekten.' },
        'about.mindset': { en: 'I enjoy improving development workflows, writing reliable tests and automating repetitive tasks. I stay pragmatic and focus on measurable improvements like performance and developer experience.', de: 'Ich optimiere gern Entwicklungs‑Workflows, schreibe zuverlässige Tests und automatisiere wiederkehrende Aufgaben. Mein Fokus liegt auf pragmatischen, messbaren Verbesserungen wie Performance und Developer Experience.' },
        'about.approach': { en: 'I approach problems by breaking them into small, testable steps, iterating quickly and preferring simple, maintainable solutions. Keywords: analytical thinking, pragmatic engineering, testing, collaboration.', de: 'Ich löse Probleme, indem ich sie in kleine, testbare Schritte zerlege, schnell iteriere und einfache, wartbare Lösungen bevorzuge. Stichworte: analytisches Denken, pragmatische Umsetzung, Tests, Zusammenarbeit.' },
        'skills.subtitle': { en: 'Technologies', de: 'Technologien' },
        'skills.title': { en: 'Skill Set', de: 'Fähigkeiten' },
        'skills.intro': { en: 'I build front-end applications using JavaScript and TypeScript and work with modern frameworks such as Angular. My focus is on clean architecture, testability and performance. I value readable, well-documented code, automated tests and clear component boundaries that make maintenance and collaboration easier.', de: 'Ich entwickle Frontend‑Anwendungen mit JavaScript und TypeScript und arbeite mit modernen Frameworks wie Angular. Mein Fokus liegt auf sauberer Architektur, Testbarkeit und Performance. Mir sind lesbarer, gut dokumentierter Code, automatisierte Tests und klare Komponenten‑Grenzen wichtig, damit Wartung und Zusammenarbeit leichter fallen.' },
        'skills.needSkill': { en: 'You need', de: 'Du benötigst' },
        'skills.anotherSkill': { en: 'another skill?', de: 'eine andere Fähigkeit?' },
        'skills.contact': { en: 'Feel free to contact me. I look forward to expanding on my previous knowledge.', de: 'Kontaktiere mich gerne. Ich freue mich darauf, mein bisheriges Wissen zu erweitern.' },
        'skills.letsTalk': { en: "Let's talk", de: 'Lass uns reden' },
        'skills.technologies': { en: 'Technologies', de: 'Technologien' },
        'projects.title': { en: 'Featured Projects', de: 'Meine Projekte' },
        'projects.header': { en: 'Portfolio', de: 'Portfolio' },
        'projects.intro': { en: 'Explore a selection of my work here - Interact with projects to see my skills in action.', de: 'Entdecke hier eine Auswahl meiner Arbeiten - Interagiere mit Projekten, um meine Fähigkeiten in Aktion zu sehen.' },
        'projects.proj1.description': { en: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.', de: 'Aufgabenmanager, inspiriert vom Kanban-System. Erstelle und organisiere Aufgaben per Drag & Drop, weise Benutzern und Kategorien zu.' },
        'projects.proj2.description': { en: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.', de: 'Jump-and-Run-Spiel basierend auf einem objektorientierten Ansatz. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen das verrückte Huhn zu kämpfen.' },
        'projects.proj3.description': { en: 'This interactive Pokédex, built with HTML, CSS, and JavaScript, pulls data from an API to display each Pokémon’s name, image, and type.', de: 'Dieser interaktive Pokédex, gebaut mit HTML, CSS und JavaScript, holt Daten aus einer API, um Namen, Bild und Typ jedes Pokémons anzuzeigen.' },
        'projects.modal.whatIs': { en: 'What is this project about?', de: 'Worum geht es in diesem Projekt?' },
        'projects.modal.github': { en: 'GitHub', de: 'GitHub' },
        'projects.modal.live': { en: 'Live Test', de: 'Live Test' },
        'projects.modal.nextProject': { en: 'Next Project', de: 'Nächstes Projekt' },
        'testimonials.header': { en: 'What my colleagues say about me', de: 'Was meine Kolleg:innen über mich sagen' },
        'testimonials.t1.message': { en: "Working with Dennis was a delight. His attention to accessibility and detail significantly lifted our product quality.", de: 'Die Zusammenarbeit mit Dennis war großartig. Seine Aufmerksamkeit für Barrierefreiheit und Details hat die Produktqualität deutlich erhöht.' },
        'testimonials.t2.message': { en: 'Dennis brings thoughtful design and pragmatic engineering together; he ships reliable UI that feels polished.', de: 'Dennis vereint durchdachtes Design und pragmatische Entwicklung; er liefert zuverlässige, ausgefeilte Benutzeroberflächen.' },
        'testimonials.t3.message': { en: "In our cohort Dennis' user research and quick iterations improved the interface's clarity and polish.", de: 'In unserer Weiterbildung hat Dennis durch nutzerzentrierte Recherche und schnelle Iterationen die Oberfläche klarer und ausgereifter gemacht.' },
        'testimonials.t4.message': { en: 'A dependable teammate. Dennis turns ambiguous tasks into clear, production-ready features with care.', de: 'Ein verlässlicher Kollege. Dennis verwandelt unklare Aufgaben sorgfältig in produktionsreife Features.' },
        'testimonials.t1.position': { en: 'Cohort Product Lead', de: 'Product Lead, Weiterbildung' },
        'testimonials.t2.position': { en: 'Frontend Lead, Student Project', de: 'Frontend Lead, Studierendenprojekt' },
        'testimonials.t3.position': { en: 'Project Collaborator, Training', de: 'Projektmitarbeiter, Weiterbildung' },
        'testimonials.t4.position': { en: 'Project Collaborator, Training', de: 'Projektmitarbeiter, Weiterbildung' },
        'contact.subtitle': { en: 'Contact me', de: 'Kontaktiere mich' },
        'contact.titleLine1': { en: "Let's work", de: 'Arbeiten wir' },
        'contact.titleLine2': { en: 'together', de: 'zusammen' },
        'contact.h2': { en: 'Got a problem to solve?', de: 'Hast du ein Problem zu lösen?' },
        'contact.intro': { en: 'I am seeking a full‑time Frontend Developer role where I can contribute long‑term to product development. I deliver maintainable UI components, reliable tests and targeted performance improvements that improve user experience and reduce production issues. I can support your projects with concrete, measurable improvements.', de: 'Ich suche eine Festanstellung als Frontend‑Entwickler, in der ich langfristig zur Produktentwicklung beitragen kann. Ich implementiere wartbare UI‑Komponenten, zuverlässige Tests und gezielte Performance‑Optimierungen. Damit kann ich Ihre Projekte durch konkrete, messbare Verbesserungen unterstützen.' },
        'contact.needDevPrefix': { en: 'Need a Frontend developer?', de: 'Braucht ihr einen Frontend-Entwickler?' },
        'contact.needDevSpan': { en: "Let’s talk!", de: 'Lass uns reden!' },
        'contact.nameQuestion': { en: "What's your name?", de: 'Wie heißt du?' },
        'contact.emailQuestion': { en: "What's your email?", de: 'Wie ist deine E-Mail?' },
        'contact.messageQuestion': { en: 'How can I help you?', de: 'Wie kann ich dir helfen?' },
        'contact.placeholder.name': { en: 'Your name goes here?', de: 'Dein Name' },
        'contact.placeholder.email': { en: 'youremail@email.com', de: 'deine@email.de' },
        'contact.placeholder.message': { en: 'Hello Dennis, I am interested in...', de: 'Hallo Dennis, ich interessiere mich für...' },
        'contact.errorNameMissing': { en: "Oops! It seems your name is missing.", de: 'Ups! Dein Name fehlt.' },
        'contact.errorNameFormat': { en: 'Please enter your first and last name.', de: 'Bitte gib Vor- und Nachname an.' },
        'contact.errorEmailMissing': { en: 'Hoopla! Your email is required.', de: 'Hoppla! Deine E-Mail ist erforderlich.' },
        'contact.errorEmailInvalid': { en: 'Please enter a valid email address.', de: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        'contact.errorMessageTooShort': { en: 'Please provide at least 10 characters.', de: 'Bitte gib mindestens 10 Zeichen an.' },
        'contact.privacy.prefix': { en: "I've read the", de: 'Ich habe die' },
        'contact.privacy.link': { en: 'privacy policy', de: 'Datenschutzerklärung' },
        'contact.privacy.suffix': { en: 'and agree to the processing of my data as outlined.', de: 'gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.' },
        'contact.privacy.error': { en: 'Please accept the privacy policy.', de: 'Bitte akzeptiere die Datenschutzerklärung.' },
        'contact.success': { en: 'Thank you for contacting me! <br> The email has been sent successfully.', de: 'Danke für deine Nachricht! <br> Die E-Mail wurde erfolgreich gesendet.' },
        'contact.submit': { en: 'Say Hello ;)', de: 'Sag Hallo ;)' },
        'footer.webDev': { en: 'Web Developer', de: 'Web Entwickler' },
        'footer.email': { en: 'Email', de: 'E-Mail' },
        'footer.legal': { en: 'Legal Notice', de: 'Impressum' },
        'footer.imprint': { en: 'Imprint', de: 'Impressum' },
        'legal.title': { en: 'Legal Notice', de: 'Impressum' },
        'legal.subtitle': { en: 'Imprint', de: 'Impressum' },
        'legal.exploring.title': { en: 'Exploring the Board', de: 'Impressum' },
        'legal.exploring.text': { en: 'Email: dennis.tran@hotmail.de', de: 'Email: dennis.tran&#64;hotmail.de' },
        'legal.acceptance.title': { en: 'Acceptance of terms', de: 'Zustimmung zu den Bedingungen' },
        'legal.acceptance.text': { en: 'By accessing and using <span>Portfolio</span> (Product), you acknowledge and agree to the following terms and conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.', de: 'Durch den Zugriff und die Nutzung von <span>Portfolio</span> (Produkt) erkennen Sie die folgenden Bedingungen an und stimmen ihnen zu. Wir, die aufgeführten Studierenden, können die Bedingungen von Zeit zu Zeit ohne Vorankündigung ändern.' },
        'legal.scope.title': { en: 'Scope and ownership of the product', de: 'Geltungsbereich und Eigentum' },
        'legal.scope.text': { en: '<span>Portfolio</span> has been developed as part of a student group project in a web development bootcamp at the <span>Developer Akademie GmbH</span>. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product. The design of <span>Portfolio</span> is owned by the <span>Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.', de: '<span>Portfolio</span> wurde im Rahmen eines studentischen Gruppenprojekts in einem Web‑Development‑Bootcamp an der <span>Developer Akademie GmbH</span> entwickelt. Es dient Bildungszwecken und ist nicht für umfangreiche private oder geschäftliche Nutzung vorgesehen. Daher können wir keine gleichbleibende Verfügbarkeit, Zuverlässigkeit, Genauigkeit oder andere Qualitätsmerkmale garantieren. Das Design von <span>Portfolio</span> gehört der <span>Developer Akademie GmbH</span>. Unbefugte Nutzung, Reproduktion, Veränderung, Verbreitung oder Vervielfältigung des Designs ist strengstens untersagt.' },
        'legal.proprietary.title': { en: 'Proprietary rights', de: 'Eigentumsrechte' },
        'legal.proprietary.text': { en: 'Aside from the design owned by <span>Developer Akademie GmbH</span>, we, the listed students, retain all proprietary rights in <span>Portfolio</span>, including any associated copyrighted material, trademarks, and other proprietary information.', de: 'Abgesehen vom Design, das der <span>Developer Akademie GmbH</span> gehört, behalten wir, die aufgeführten Studierenden, alle Eigentumsrechte an <span>Portfolio</span>, einschließlich urheberrechtlich geschützter Materialien, Marken und sonstiger proprietärer Informationen.' },
        'legal.use.title': { en: 'Use of the product', de: 'Nutzung des Produkts' },
        'legal.use.text': { en: '<span>Portfolio</span> is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use of <span>Portfolio</span> for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are solely responsible for your interactions with other users of <span>Portfolio</span>.', de: '<span>Portfolio</span> darf nur für rechtmäßige Zwecke und in Übereinstimmung mit allen geltenden Gesetzen und Vorschriften verwendet werden. Jegliche Nutzung von <span>Portfolio</span> für illegale Aktivitäten oder zur Belästigung, Schädigung, Bedrohung oder Einschüchterung einer anderen Person ist strikt untersagt. Sie sind allein verantwortlich für Ihre Interaktionen mit anderen Nutzern von <span>Portfolio</span>.' },
        'legal.disclaimer.title': { en: 'Disclaimer of warranties and limitation of liability', de: 'Haftungsausschluss und Haftungsbeschränkung' },
        'legal.disclaimer.text': { en: '<span>Portfolio</span> is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we, the listed students, or the Developer Akademie, be liable for any direct, indirect, incidental, special, consequential or exemplary damages.', de: '<span>Portfolio</span> wird "wie besehen" ohne jegliche Gewährleistung bereitgestellt, sei es ausdrücklich oder stillschweigend, einschließlich, aber nicht beschränkt auf die Gewährleistungen der Marktgängigkeit, Eignung für einen bestimmten Zweck und Nichtverletzung. Unter keinen Umständen haften wir, die aufgeführten Studierenden, oder die Developer Akademie für direkte, indirekte, zufällige, besondere, Folgeschäden oder exemplarische Schäden.' },
        'legal.indemnity.title': { en: 'Indemnity', de: 'Entschädigung' },
        'legal.indemnity.text': { en: 'You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and our affiliates, partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or relating to your use of <span>Portfolio</span> and/or your breach of this Legal Notice.', de: 'Sie stimmen zu, uns, die aufgeführten Studierenden, die Developer Akademie und unsere verbundenen Unternehmen, Partner, Geschäftsführer, Direktoren, Vertreter und Mitarbeiter von Ansprüchen, Forderungen, Verlusten, Schäden, Kosten oder Haftungen (einschließlich angemessener Anwaltskosten) freizustellen, zu verteidigen und schadlos zu halten, die sich aus Ihrer Nutzung von <span>Portfolio</span> und/oder Ihrem Verstoß gegen dieses Impressum ergeben.' },
        'legal.contact.title': { en: 'Contact', de: 'Kontakt' },
        'legal.contact.text': { en: 'For any questions or notices, please contact us at dennis.tran&#64;hotmail.de.', de: 'Bei Fragen oder Mitteilungen kontaktieren Sie uns bitte unter dennis.tran&#64;hotmail.de.' },
        'privacy.title': { en: 'Privacy Policy', de: 'Datenschutzerklärung' },
        'privacy.subtitle': { en: 'Data Protection', de: 'Datenschutz' },
        'privacy.intro.title': { en: 'Introduction', de: 'Einleitung' },
        'privacy.intro.text': { en: 'We take the protection of your personal data seriously. This policy explains what data we collect, how we use it, and your rights.', de: 'Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Diese Richtlinie erklärt, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.' },
        'privacy.collection.title': { en: 'Data Collection', de: 'Datenerhebung' },
        'privacy.collection.text': { en: 'When you use the contact form we collect your name, email address and message content. This data is used solely to respond to your inquiry.', de: 'Wenn Sie das Kontaktformular nutzen, erfassen wir Ihren Namen, Ihre E-Mail-Adresse und den Nachrichteninhalt. Diese Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet.' },
        'privacy.use.title': { en: 'Use of Data', de: 'Verwendung der Daten' },
        'privacy.use.text': { en: 'Your personal data will be used to process and respond to inquiries and to communicate about potential projects. Data will not be shared without consent except where required by law.', de: 'Ihre personenbezogenen Daten werden verwendet, um Anfragen zu bearbeiten und über mögliche Projekte zu kommunizieren. Daten werden nicht ohne Zustimmung weitergegeben, außer wenn gesetzlich vorgeschrieben.' },
        'privacy.storage.title': { en: 'Data Storage', de: 'Datenspeicherung' },
        'privacy.storage.text': { en: 'Data is stored only as long as necessary to fulfill the purpose. Once resolved and no legal retention applies, data will be deleted.', de: 'Daten werden nur so lange gespeichert, wie es zur Erfüllung des Zwecks erforderlich ist. Nach Abschluss und ohne gesetzliche Aufbewahrungspflicht werden die Daten gelöscht.' },
        'privacy.rights.title': { en: 'Your Rights', de: 'Ihre Rechte' },
        'privacy.rights.text': { en: 'You have the right to access, correct, request deletion, object to processing and request portability. To exercise these rights contact us at', de: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Widerspruch gegen die Verarbeitung und Übertragbarkeit. Zur Ausübung dieser Rechte kontaktieren Sie uns unter' },
        'privacy.cookies.title': { en: 'Cookies and Tracking', de: 'Cookies und Tracking' },
        'privacy.cookies.text': { en: 'This website currently does not use cookies or tracking technologies. If this changes we will update this policy.', de: 'Diese Website verwendet derzeit keine Cookies oder Tracking-Technologien. Sollte sich dies ändern, aktualisieren wir diese Richtlinie.' },
        'privacy.security.title': { en: 'Security', de: 'Sicherheit' },
        'privacy.security.text': { en: 'We implement technical and organizational measures to protect your data, but no transmission method over the internet is completely secure.', de: 'Wir setzen technische und organisatorische Maßnahmen zum Schutz Ihrer Daten ein, aber keine Übertragungsmethode ist vollständig sicher.' },
        'privacy.changes.title': { en: 'Changes to this Privacy Policy', de: 'Änderungen dieser Datenschutzerklärung' },
        'privacy.changes.text': { en: 'We reserve the right to update this privacy policy at any time. Changes will be posted with an updated effective date.', de: 'Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu aktualisieren. Änderungen werden mit einem aktualisierten Datum veröffentlicht.' },
        'privacy.contactPrefix': { en: 'If you have any questions, please contact us at', de: 'Bei Fragen kontaktieren Sie uns bitte unter' },
    };

    constructor() { }

    private getInitialLanguage(): Language {
        const stored = localStorage.getItem('preferredLanguage');
        return (stored === 'en' || stored === 'de') ? stored : 'en';
    }

    get currentLang(): Language {
        return this.currentLangSubject.value;
    }

    setLanguage(lang: Language) {
        this.currentLangSubject.next(lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    toggleLanguage() {
        const newLang: Language = this.currentLang === 'en' ? 'de' : 'en';
        this.setLanguage(newLang);
    }

    translate(key: string): string {
        const translation = this.translations[key];
        if (!translation) {
            return key;
        }
        return translation[this.currentLang];
    }
}
