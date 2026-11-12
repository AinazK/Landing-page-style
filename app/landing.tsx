"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Camera, CalendarDays, Layers2, Check, ChevronDown, Menu, Plus, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WardrobeLab from "./wardrobe/lab";
import { LabelMark } from "./wardrobe/garment";
import { track } from "./telemetry";

const Arrow = () => <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />;
const faqs = [
  ["Сервис уже доступен?", "Веб-приложение в разработке. Сейчас собираем первую пилотную группу. О начале тестирования сообщим в Telegram."],
  ["Нужно что-то устанавливать?", "Планируем доступ через браузер на телефоне и компьютере. Отдельное приложение скачивать не потребуется. Поддерживаемые браузеры уточним перед пилотом."],
  ["Что будет после заявки?", "Команда напишет в Telegram, расскажет об условиях и пришлёт ссылку, когда начнётся тестирование. Точная дата пока не объявлена."],
  ["Нужно фотографировать весь шкаф?", "Начнём с небольшой подборки любимых вещей. Личные фотографии на этот лендинг загружать не нужно."],
  ["Сколько это стоит?", "Заявка бесплатна. Условия пилота и стоимость будущего сервиса сообщим до начала участия."],
  ["Как изменить или удалить заявку?", "Напишите @DuImaran в Telegram и укажите имя пользователя из анкеты. Команда изменит или удалит заявку и прекратит дальнейшую связь."],
];

function PrivacyDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return (
    <dialog ref={ref} className="privacy-dialog" aria-labelledby="privacy-heading" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) ref.current?.close(); }}>
      <button className="dialog-close icon-button" aria-label="Закрыть" onClick={() => ref.current?.close()}><X size={22} /></button>
      <span className="eyebrow">Заявка на тестирование</span>
      <h2 id="privacy-heading">О ваших данных</h2>
      <p>Команда проекта «ИИ-стилист» сохраняет имя, возрастную группу, Telegram и телефон, если вы его указали, для связи по поводу закрытого тестирования. Можно дополнительно сообщить интересующую задачу.</p>
      <p>Фотографии посетителей на лендинг не загружаются. Данные заявки доступны владельцу проекта и не публикуются на сайте.</p>
      <p>Для оценки интереса к проекту используются общие счётчики событий. Они не содержат имени, Telegram и не являются числом уникальных людей. Для защиты от частых запросов временно используется хеш сетевого адреса.</p>
      <p>Чтобы изменить или удалить заявку и отозвать согласие на дальнейшую связь, напишите команде в Telegram: <a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">@DuImaran <Arrow /></a>.</p>
      <p className="muted small">Версия от 12 ноября 2026 года.</p>
    </dialog>
  );
}

function BetaForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [name, setName] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setStatus("sending");
    const data = new FormData(event.currentTarget);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/applications", {
        method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), ageGroup: data.get("ageGroup"), telegram: data.get("telegram"), phone: data.get("phone") || "", website: data.get("website"), consent: data.get("consent") === "on", platform: data.get("platform") || null, priority: data.get("priority") || null }),
      });
      if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Сервис пока недоступен. Обновите страницу или напишите команде в Telegram.");
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      setName(String(data.get("name")).trim()); setStatus("success");
    } catch (error) {
      setError(error instanceof Error && error.name === "AbortError" ? "Ответ занял слишком много времени. Попробуйте ещё раз: повторная заявка не создаст дубликат." : error instanceof TypeError ? "Нет соединения. Проверьте интернет и попробуйте ещё раз." : error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
      setStatus("idle"); setTimeout(() => errorRef.current?.focus(), 0);
    } finally { clearTimeout(timeout); }
  }

  return <>
    {status === "success" ? (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-mark"><Check size={27} strokeWidth={1.5} /></span>
        <h3>{name}, заявка сохранена</h3>
        <p>Когда будем формировать пилотную группу, напишем в указанный Telegram и уточним детали. Дата пока не объявлена.</p>
        <a className="text-link" href="https://t.me/DuImaran" target="_blank" rel="noreferrer">Задать вопрос команде <Arrow /></a>
      </div>
    ) : (
      <form onSubmit={submit} className="beta-form">
        <div className="form-topline"><span>Заявка на тестирование</span></div>
        <div className="form-row">
          <label>Ваше имя<input name="name" autoComplete="given-name" placeholder="Как к вам обращаться" minLength={2} maxLength={60} required /></label>
          <label>Возраст<span className="select-wrap"><select name="ageGroup" defaultValue="" required><option value="" disabled>Возрастная группа</option>{["До 18", "18–24", "25–34", "35–44", "45+"].map(age => <option key={age}>{age}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></span></label>
        </div>
        <label>Telegram<input name="telegram" autoComplete="off" placeholder="@username или t.me/username" required maxLength={80} spellCheck={false} aria-describedby="telegram-help" /></label>
        <p id="telegram-help" className="field-hint">По этому имени пользователя команда сможет написать вам.</p>
        <details className="optional-fields">
          <summary>Дополнительные сведения<span>необязательно</span><Plus size={16} aria-hidden="true" /></summary>
          <div>
            <label>Что хочется решить в первую очередь<span className="select-wrap"><select name="priority" defaultValue=""><option value="">Не указывать</option><option value="daily">Проще выбирать одежду утром</option><option value="wardrobe">Найти сочетания забытых вещей</option><option value="day-route">Одеться на весь день с разными планами</option></select><ChevronDown size={15} aria-hidden="true" /></span></label>
            <label>Телефон<input name="phone" type="tel" autoComplete="tel" placeholder="+7 999 123-45-67" maxLength={24} /></label>
          </div>
        </details>
        <div className="honeypot" aria-hidden="true"><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="consent"><input id="consent" name="consent" type="checkbox" required /><label htmlFor="consent">Согласен на использование указанных данных для связи по поводу тестирования. <button type="button" className="inline-link" onClick={() => setPrivacy(true)}>О данных заявки</button></label></div>
        {error && <p ref={errorRef} tabIndex={-1} className="form-error" role="alert">{error}</p>}
        <button className="button button-dark submit-button" disabled={status === "sending"} type="submit">{status === "sending" ? "Сохраняем заявку…" : "Отправить заявку"}<Arrow /></button>
        <p className="form-footnote">Бесплатно. Условия участия сообщим до начала тестирования.</p>
      </form>
    )}
    {privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}

export default function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const joinRef = useRef<HTMLElement>(null);
  useEffect(() => {
    track("page_view");
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { track("form_view"); observer.disconnect(); } }, { threshold: .15 });
    if (joinRef.current) observer.observe(joinRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!mobileMenu) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenu]);

  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="site-header wrap">
      <a href="#" className="wordmark" aria-label="ИИ-стилист — на главную"><LabelMark /><span>ИИ-стилист</span></a>
      <nav id="mobile-navigation" className={mobileMenu ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация">
        <a href="#how" onClick={() => setMobileMenu(false)}>Как работает</a><a href="#wardrobe-lab" onClick={() => setMobileMenu(false)}>Пример дня</a><a href="#project" onClick={() => setMobileMenu(false)}>О проекте</a>
      </nav>
      <a className="header-cta" href="#join">Оставить заявку <Arrow /></a>
      <button className="menu-toggle icon-button" aria-label={mobileMenu ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileMenu} aria-controls="mobile-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={23} /> : <Menu size={23} />}</button>
    </header>

    <main id="main">
      <section className="hero hero-fullbleed" aria-labelledby="hero-heading">
        <img className="hero-background" src="/images/city-day-hero.webp" width={1672} height={941} alt="Двое друзей в повседневных образах идут по городской улице после дождя" fetchPriority="high" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content wrap"><div className="hero-copy">
          <div className="launch-label"><span />Веб-приложение в разработке</div>
          <h1 id="hero-heading">Ваш гардероб.<br /><span>Больше сочетаний.</span></h1>
          <p className="hero-description">Создаём ИИ-стилиста, который поможет выбирать одежду из ваших вещей — под погоду, планы и личные предпочтения.</p>
          <div className="hero-actions"><a className="button button-dark" href="#join">Записаться в тестирование <Arrow /></a><a className="hero-secondary" href="#wardrobe-lab">Посмотреть пример</a></div>
        </div></div>
        <p className="hero-caption wrap">Визуальная концепция ИИ-стилиста</p>
      </section>

      <section className="intro-section" id="how" aria-labelledby="how-heading">
        <div className="wrap"><div className="intro-grid"><div><span className="eyebrow">Как это будет работать</span><h2 id="how-heading">Начните с того,<br />что уже носите</h2></div><p className="intro-text">Несколько любимых вещей — для первых сочетаний.</p></div>
        <div className="steps">
          {[{ n: "01", icon: Camera, title: "Добавьте вещи", text: "Сфотографируйте любимые вещи и соберите цифровой гардероб." }, { n: "02", icon: CalendarDays, title: "Расскажите о планах", text: "Укажите повод и погоду. Остальное подстроим под ваш день." }, { n: "03", icon: Layers2, title: "Получите сочетания", text: "Сохраняйте образы из своих вещей и отмечайте понравившиеся." }].map(step => <article className="step" key={step.n}><div className="step-topline"><span className="step-number">{step.n}</span><step.icon size={29} strokeWidth={1.3} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
        <p className="development-note">Так будет устроено веб-приложение. Сейчас готовим первую версию.</p></div>
      </section>

      <WardrobeLab />

      <section className="project-section wrap" id="project" aria-labelledby="project-heading">
        <div className="project-grid">
          <div className="project-team"><span className="eyebrow">О проекте</span><h2 id="project-heading">Команда проекта</h2><p className="project-description">Делаем цифровой гардероб, которым удобно пользоваться каждый день — прямо в браузере.</p>
            <div className="team-credits"><p><span>Айназ Хайруллин</span><small>Веб-приложение и серверная часть</small></p><p><span>Арина Коваленко</span><small>Обработка фотографий и рекомендации</small></p></div>
            <a href="https://t.me/DuImaran" target="_blank" rel="noreferrer" className="text-link">Связаться с командой <Arrow /></a>
          </div>
          <div className="project-progress">
            <article><span className="progress-dot complete" /><div><span className="eyebrow">Проверено в прототипе</span><h3>Загрузка фотографий</h3><p>Загрузка и сохранение снимков вещей.</p></div></article>
            <article><span className="progress-dot current" /><div><span className="eyebrow">В разработке</span><h3>Распознавание одежды</h3><p>Определение типа и характеристик вещей.</p></div></article>
            <article><span className="progress-dot" /><div><span className="eyebrow">Следующий этап</span><h3>Проверка с участниками</h3><p>Первые гардеробы и обратная связь.</p></div></article>
          </div>
        </div>
      </section>

      <section ref={joinRef} className="join-section wrap" id="join" aria-labelledby="join-heading">
        <div className="join-copy"><span className="eyebrow">Закрытое тестирование</span><h2 id="join-heading">Попробуйте ИИ-стилиста</h2><p>Оставьте контакт для приглашения в пилот. Нам важны ваши привычки и обратная связь.</p>
          <ol className="pilot-steps">
            <li><span>1</span><div><strong>Оставьте заявку</strong><p>Достаточно имени, возрастной группы и Telegram.</p></div></li>
            <li><span>2</span><div><strong>Обсудите участие</strong><p>Расскажем об условиях и пришлём ссылку на сервис.</p></div></li>
            <li><span>3</span><div><strong>Попробуйте на своих вещах</strong><p>Соберите гардероб в браузере и поделитесь впечатлениями.</p></div></li>
          </ol>
        </div>
        <div className="form-container"><BetaForm /></div>
      </section>

      <section className="faq-section wrap" id="faq" aria-labelledby="faq-heading">
        <div className="faq-intro"><span className="eyebrow">Вопросы и ответы</span><h2 id="faq-heading">Что важно знать</h2></div>
        <Accordion type="single" collapsible className="faq-list">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`question-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion>
      </section>
    </main>

    <footer className="site-footer"><div className="wrap">
      <div className="footer-grid">
        <div className="footer-about"><a className="wordmark" href="#"><LabelMark /><span>ИИ-стилист</span></a><p>Цифровой гардероб и подбор сочетаний из ваших вещей. Веб-приложение в разработке.</p></div>
        <nav className="footer-column" aria-label="Навигация внизу страницы"><h3>Проект</h3><a href="#how">Как работает</a><a href="#wardrobe-lab">Пример дня</a><a href="#project">Команда и разработка</a><a href="#faq">Вопросы и ответы</a></nav>
        <div className="footer-column"><h3>Тестирование</h3><p>Собираем заявки в первую пилотную группу. Дату и условия участия сообщим лично.</p><a href="#join">Оставить заявку <Arrow /></a></div>
        <div className="footer-column"><h3>Связь с командой</h3><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">Telegram: @DuImaran <Arrow /></a><p>Вопросы о проекте, участии, изменении или удалении заявки.</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 ИИ-стилист</span><span>Заявка бесплатна. Платёжные данные не требуются.</span><button type="button" className="inline-link" onClick={() => setPrivacy(true)}>О данных заявки</button></div>
    </div></footer>
    {privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}
