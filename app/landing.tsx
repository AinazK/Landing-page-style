"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, CloudSun, Menu, Plus, Sparkles, X } from "lucide-react";

const Arrow = () => <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />;
const scenarios = [
  { title: "День, в котором есть всё", occasion: "Встречи и кофе в городе", weather: "+18° · переменная облачность", text: "Шоколадный жакет, светлые брюки и любимые лоферы. Спокойная палитра для дня с разными планами.", items: ["Жакет", "Футболка", "Брюки", "Лоферы"], image: "/images/editorial-wardrobe.webp", alt: "Пример образа: шоколадный жакет, светлые брюки и коричневые лоферы" },
  { title: "Никуда не торопиться", occasion: "Прогулка без расписания", weather: "+20° · мягкое солнце", text: "Свободная рубашка поверх белой футболки, прямые брюки и кеды. Простой образ для долгой прогулки.", items: ["Рубашка", "Футболка", "Брюки", "Кеды"], image: "/images/city-editorial.webp", alt: "Пример мужского образа: оливковая рубашка, белая футболка, графитовые брюки и светлые кеды" },
];
const faqs = [
  ["Что такое ИИ-стилист?", "Мы создаём приложение с цифровым гардеробом. Оно поможет находить сочетания ваших вещей и выбирать образы с учётом погоды, планов и личных предпочтений."],
  ["Приложением уже можно пользоваться?", "Сейчас проект в разработке. Мы собираем заявки в закрытое тестирование и напишем участникам, когда появится возможность попробовать приложение. Точная дата пока не объявлена."],
  ["Нужно ли покупать новую одежду?", "Основная идея — по-новому использовать то, что уже есть в вашем гардеробе. Подбор образов из собственных вещей станет основой приложения."],
  ["Кому подойдёт приложение?", "Всем, кто хочет проще собираться и лучше понимать свой гардероб. Мы делаем сервис для разных стилей, без привязки только к женской или мужской одежде."],
  ["Зачем оставлять Telegram и возраст?", "В Telegram мы пришлём приглашение в тестирование и уточним детали участия. Возрастная группа поможет подобрать разнообразную группу участников. Телефон можно не указывать."],
];

function PrivacyDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="privacy-dialog" aria-labelledby="privacy-heading" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}>
    <button className="dialog-close icon-button" aria-label="Закрыть" onClick={() => ref.current?.close()}><X size={22} /></button>
    <span className="eyebrow">Заявка на тестирование</span><h2 id="privacy-heading">О ваших данных</h2>
    <p>Команда проекта «ИИ-стилист» сохраняет имя, возрастную группу, Telegram и телефон, если вы его указали, чтобы связаться с вами по поводу закрытого тестирования.</p>
    <p>Данные заявки доступны владельцу проекта. Они не публикуются на сайте и не используются для рекламных рассылок. Вместе с заявкой сохраняются время отправки и версия согласия.</p>
    <p>Чтобы изменить или удалить заявку и отозвать согласие на дальнейшую связь, напишите команде в Telegram: <a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">@DuImaran <Arrow /></a>.</p>
    <p className="muted small">Версия от 12 ноября 2026 года.</p>
  </dialog>;
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
    try {
      const response = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), ageGroup: data.get("ageGroup"), telegram: data.get("telegram"), phone: data.get("phone"), website: data.get("website"), consent: data.get("consent") === "on" }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      setName(String(data.get("name")).trim()); setStatus("success");
    } catch (e) { setError(e instanceof Error ? e.message : "Нет соединения. Проверьте интернет и попробуйте ещё раз."); setStatus("idle"); setTimeout(() => errorRef.current?.focus(), 0); }
  }
  return <>
    {status === "success" ? <div className="form-success" role="status" aria-live="polite"><span className="success-mark"><Check size={30} strokeWidth={1.3} /></span><span className="eyebrow">Заявка принята</span><h3>{name}, вы в списке.</h3><p>Приглашение в закрытое тестирование придёт в Telegram, который вы указали. Рады знакомству!</p><a className="text-link" href="https://t.me/DuImaran" target="_blank" rel="noreferrer">Написать команде <Arrow /></a></div> : <form onSubmit={submit} className="beta-form">
      <div className="form-topline"><span>НЕМНОГО О ВАС</span><span>01 / ЗНАКОМСТВО</span></div>
      <div className="form-row"><label>Как вас зовут<input name="name" autoComplete="given-name" placeholder="Ваше имя" minLength={2} maxLength={60} required /></label><label>Возрастная группа<span className="select-wrap"><select name="ageGroup" defaultValue="" required><option value="" disabled>Выберите возраст</option>{["До 18", "18–24", "25–34", "35–44", "45+"].map(age => <option key={age}>{age}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></span></label></div>
      <label>Telegram<input name="telegram" autoComplete="off" placeholder="@username или t.me/username" required maxLength={80} spellCheck={false} aria-describedby="telegram-help" /></label><p id="telegram-help" className="field-hint">Сюда отправим приглашение. Укажите имя пользователя из настроек Telegram.</p>
      <label>Телефон<span className="optional">необязательно</span><input name="phone" type="tel" autoComplete="tel" placeholder="+7 999 123-45-67" maxLength={24} /></label>
      <div className="honeypot" aria-hidden="true"><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="consent"><input name="consent" type="checkbox" required /><span>Согласен на использование указанных данных для связи по поводу закрытого тестирования. <button type="button" className="inline-link" onClick={() => setPrivacy(true)}>Подробнее о данных</button></span></label>
      {error && <p ref={errorRef} tabIndex={-1} className="form-error" role="alert">{error}</p>}
      <button className="button button-dark submit-button" disabled={status === "sending"} type="submit">{status === "sending" ? "Отправляем заявку…" : "Хочу попробовать первым"}<Arrow /></button><p className="form-footnote">Без обязательств. Поможете нам сделать приложение лучше.</p>
    </form>}{privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}

export default function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [look, setLook] = useState(0);
  const [privacy, setPrivacy] = useState(false);
  const current = scenarios[look];
  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="site-header wrap"><a href="#" className="wordmark" aria-label="ИИ-стилист — на главную"><Sparkles size={24} strokeWidth={1.3} /><span>ИИ<span className="brand-dot">.</span>стилист</span></a><nav id="mobile-navigation" className={mobileMenu ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация"><a href="#how" onClick={() => setMobileMenu(false)}>Как это работает</a><a href="#looks" onClick={() => setMobileMenu(false)}>Вдохновение</a><a href="#faq" onClick={() => setMobileMenu(false)}>Вопросы</a></nav><a className="header-cta" href="#join">В список первых <Arrow /></a><button className="menu-toggle icon-button" aria-label={mobileMenu ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileMenu} aria-controls="mobile-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={24} /> : <Menu size={24} />}</button></header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-heading"><div className="hero-copy"><div className="launch-label"><span />Приглашаем в закрытое тестирование</div><h1 id="hero-heading">Знакомые<br />вещи.<br /><em>Новые образы.</em></h1><p className="hero-description">Ваш стиль уже есть в вашем шкафу.<br className="desktop-break" /> Мы поможем увидеть его по-новому.</p><a className="button button-dark" href="#join">Стать бета-тестером <Arrow /></a><p className="hero-note"><span className="tiny-line" />Оставьте заявку в закрытое тестирование</p></div><div className="hero-visual"><div className="visual-topline"><span>ЛИЧНЫЙ ГАРДЕРОБ, НОВЫЙ ВЗГЛЯД</span><span>VOL. 01</span></div><div className="hero-photo"><img src="/images/editorial-wardrobe.webp" width={1536} height={1024} alt="Женщина в шоколадном жакете и светлых брюках, рядом — отдельные вещи из этого образа" fetchPriority="high" /><div className="photo-label"><Sparkles size={14} /> Всё начинается с ваших вещей</div></div><div className="visual-caption"><span>Один гардероб. Множество сочетаний.</span><span className="image-note">Визуальная концепция</span></div><div className="visual-side-note">THE ART OF GETTING DRESSED</div></div></section>
      <div className="editorial-divider wrap"><span>МЕНЬШЕ «НЕЧЕГО НАДЕТЬ»</span><span className="divider-flower">✳</span><span>БОЛЬШЕ ВАШЕГО СТИЛЯ</span><a href="#how" aria-label="Узнать, как работает приложение"><ArrowDown size={18} strokeWidth={1.3} /></a></div>
      <section className="intro-section wrap" id="how" aria-labelledby="how-heading"><div className="section-marker"><span>01 / ИДЕЯ</span><span>ОДЕЖДА ЗНАКОМАЯ. ВОЗМОЖНОСТИ НОВЫЕ.</span></div><div className="intro-grid"><h2 id="how-heading">Свой гардероб.<br /><em>Свежие идеи.</em></h2><div className="intro-text"><p>Любимый жакет. Брюки, о которых вы забыли. Та самая футболка.</p><p className="muted">Мы создаём ИИ-стилиста, который поможет собрать ваши вещи в цифровой гардероб и находить сочетания под погоду, планы и настроение.</p><a href="#join" className="text-link">Хочу познакомиться со стилистом <Arrow /></a></div></div><div className="steps">{[{ n: "01", title: "Покажите свои вещи", text: "Загрузите фотографии одежды. Приложение поможет распознать вещи и собрать цифровой гардероб.", icon: "＋" }, { n: "02", title: "Расскажите о планах", text: "Рабочий день, прогулка или встреча — подбор будет учитывать повод, погоду и ваши предпочтения.", icon: "↗" }, { n: "03", title: "Откройте сочетания", text: "Получайте идеи образов из своих вещей и отмечайте любимые, чтобы рекомендации становились точнее.", icon: "✳" }].map(step => <article className="step" key={step.n}><div className="step-top"><span>{step.n}</span><span aria-hidden="true">{step.icon}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className="development-note">Так мы планируем устроить приложение. Сейчас оно в разработке.</p></section>
      <section className="looks-section" id="looks" aria-labelledby="looks-heading"><div className="wrap"><div className="section-marker"><span>02 / ВДОХНОВЕНИЕ</span><span>ОДЕВАТЬСЯ — ТОЖЕ СПОСОБ БЫТЬ СОБОЙ</span></div><div className="looks-heading-row"><h2 id="looks-heading">Под ваши планы.<br /><em>В вашем стиле.</em></h2><p>Вдохновение на каждый день.<br />С вниманием к вам.</p></div><div className="look-tabs" role="tablist" aria-label="Примеры образов">{["Собранно и спокойно", "Легко и свободно"].map((label, i) => <button key={label} id={`look-tab-${i}`} type="button" role="tab" aria-selected={look === i} aria-controls="look-panel" tabIndex={look === i ? 0 : -1} onClick={() => setLook(i)} onKeyDown={e => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) { e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 1 : 1 - look; setLook(next); document.getElementById(`look-tab-${next}`)?.focus(); } }}>{label}<Arrow /></button>)}</div><div className="look-panel" id="look-panel" role="tabpanel" aria-labelledby={`look-tab-${look}`}><div className="look-image"><img key={current.image} src={current.image} alt={current.alt} loading="lazy" width={1536} height={1024} /><span className="look-number">0{look + 1}</span></div><div className="look-story"><span className="eyebrow">Пример образа</span><h3>{current.title}</h3><p>{current.text}</p><div className="look-context"><CloudSun size={19} strokeWidth={1.4} /><span>{current.weather}</span></div><div className="look-context"><ArrowUpRight size={19} strokeWidth={1.4} /><span>{current.occasion}</span></div><div className="garment-tags">{current.items.map(item => <span key={item}>{item}</span>)}</div><p className="demo-note">Иллюстрация идеи сервиса. Персональный подбор появится в приложении.</p></div></div></div></section>
      <section className="join-section wrap" id="join" aria-labelledby="join-heading"><div className="join-copy"><span className="eyebrow">03 / НАЧНЁМ СО ЗНАКОМСТВА</span><h2 id="join-heading">Ваш стиль.<br />Наша первая<br /><em>глава.</em></h2><p>Приглашаем в закрытое тестирование ИИ-стилиста. Попробуйте приложение одним из первых и помогите нам понять, что действительно удобно.</p><div className="invitation-note"><span className="small-star">✳</span><p>Мы напишем в Telegram,<br />когда будем готовы пригласить вас.</p></div><span className="join-signature">С заботой о вашем стиле,<br /><em>команда ИИ-стилиста</em></span></div><div className="form-container"><BetaForm /></div></section>
      <section className="faq-section wrap" id="faq" aria-labelledby="faq-heading"><div><span className="eyebrow">04 / ЕСТЬ ВОПРОСЫ?</span><h2 id="faq-heading">Немного<br /><em>подробностей.</em></h2><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer" className="text-link">Спросить у команды <Arrow /></a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} strokeWidth={1.4} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className="site-footer wrap"><div className="footer-top"><a className="wordmark" href="#"><Sparkles size={24} strokeWidth={1.3} /><span>ИИ<span className="brand-dot">.</span>стилист</span></a><p>Больше сочетаний.<br />Больше себя.</p><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">Написать нам в Telegram <Arrow /></a></div><div className="footer-bottom"><span>© 2026 ИИ-стилист. Проект в разработке.</span><button type="button" className="inline-link" onClick={() => setPrivacy(true)}>О данных заявки</button><a href="#" className="back-top">Наверх ↑</a></div></footer>{privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}
