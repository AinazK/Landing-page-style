"use client";

import { useId, useRef } from "react";

export default function StylistChat() {
  const outfitDialog = useRef<HTMLDialogElement>(null);
  const outfitOpener = useRef<HTMLButtonElement>(null);
  const outfitDialogId = useId();
  const outfitTitleId = useId();
  const outfitNoteId = useId();

  function openOutfit() {
    if (!outfitDialog.current?.open) outfitDialog.current?.showModal();
  }

  return (
    <section className="stylist-chat-section wrap" id="stylist-chat" aria-labelledby="stylist-chat-heading">
      <div className="stylist-chat-copy">
        <span className="stylist-chat-kicker">ИИ-стилист рядом</span>
        <h2 id="stylist-chat-heading">Не знаете, что надеть?<br /><span>Спросите стилиста</span></h2>
        <p>Спросите про образ на вечер или капсулу для поездки. Чат поможет выбрать сочетающиеся вещи из вашего гардероба.</p>
        <span className="stylist-chat-note">Готовим для веб-приложения</span>
      </div>

      <div className="stylist-chat-dialogue" aria-label="Иллюстрация будущего чата со стилистом">
        <div className="stylist-chat-topline"><span>Пример диалога</span><span className="stylist-chat-thread" aria-hidden="true">ИИ</span></div>
        <ol className="stylist-chat-messages">
          <li className="stylist-chat-user">
            <span className="stylist-chat-speaker">Вы</span>
            <p>Еду в Петербург на три дня: прогулки и ужин с друзьями. Что взять из моих вещей?</p>
          </li>
          <li className="stylist-chat-answer">
            <span className="stylist-chat-speaker">ИИ-стилист</span>
            <p>Из вашего гардероба я бы взял за основу белую футболку, тёмные брюки и удобные кеды. Для ужина добавил бы жакет, а на прогулку — плащ: в прогнозе +12° и дождь.</p>
            <button ref={outfitOpener} type="button" className="stylist-chat-outfit" onClick={openOutfit} aria-label="Рассмотреть один из образов для поездки" aria-haspopup="dialog" aria-controls={outfitDialogId}>
              <img src="/images/chat-outfit.webp" width={1024} height={1536} alt="" loading="lazy" />
              <span>Один из образов<br />для поездки</span>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 3H3v4M13 3h4v4M3 13v4h4M17 13v4h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="stylist-chat-context">Погода учтена автоматически · вещи из вашего гардероба</span>
          </li>
        </ol>
      </div>

      <dialog ref={outfitDialog} id={outfitDialogId} className="stylist-chat-outfit-dialog" aria-labelledby={outfitTitleId} aria-describedby={outfitNoteId} onClose={() => outfitOpener.current?.focus()} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <button type="button" className="stylist-chat-outfit-close" autoFocus onClick={() => outfitDialog.current?.close()} aria-label="Закрыть образ"><span aria-hidden="true">×</span></button>
        <div className="stylist-chat-outfit-layout">
          <figure className="stylist-chat-outfit-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} alt="Пример образа для поездки: белая футболка, шоколадный жакет, тёмные брюки, светлые кеды и плащ на руке" /></figure>
          <div className="stylist-chat-outfit-details">
            <span className="stylist-chat-outfit-kicker">Из вашего гардероба</span>
            <h3 id={outfitTitleId}>На прогулку.<br /><span>И на ужин.</span></h3>
            <p className="stylist-chat-outfit-weather">Петербург · +12° · дождь</p>
            <dl className="stylist-chat-outfit-notes">
              <div><dt>Основа</dt><dd>Белая футболка, тёмные брюки и удобные кеды.</dd></div>
              <div><dt>Для ужина</dt><dd>Шоколадный жакет делает образ собраннее.</dd></div>
              <div><dt>На случай дождя</dt><dd>Плащ — верхний слой для прогулки.</dd></div>
            </dl>
            <p id={outfitNoteId} className="stylist-chat-outfit-footnote">Один из образов для поездки.<br />Иллюстрация будущей рекомендации.</p>
          </div>
        </div>
      </dialog>
    </section>
  );
}
