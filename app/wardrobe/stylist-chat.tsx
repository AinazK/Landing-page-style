"use client";

import { useId, useRef } from "react";

export default function StylistChat() {
  const outfitDialog = useRef<HTMLDialogElement>(null);
  const outfitOpener = useRef<HTMLButtonElement>(null);
  const outfitDialogId = useId();
  const outfitTitleId = useId();

  function openOutfit() {
    if (!outfitDialog.current?.open) outfitDialog.current?.showModal();
  }

  return (
    <section className="stylist-chat-section wrap" id="stylist-chat" aria-labelledby="stylist-chat-heading">
      <div className="stylist-chat-copy">
        <span className="stylist-chat-kicker">ИИ-стилист рядом</span>
        <h2 id="stylist-chat-heading">Не знаете, что надеть?<br /><span>Спросите стилиста.</span></h2>
        <p>Спросите про образ на вечер или капсулу для поездки. Чат поможет выбрать сочетающиеся вещи из вашего гардероба.</p>
        <span className="stylist-chat-note">Готовим для веб-приложения</span>
      </div>

      <div className="stylist-chat-dialogue" aria-label="Иллюстрация будущего чата со стилистом">
        <div className="stylist-chat-topline"><span>Пример диалога</span><span className="stylist-chat-thread" aria-hidden="true">ИИ</span></div>
        <ol className="stylist-chat-messages">
          <li className="stylist-chat-user">
            <span className="stylist-chat-speaker">Вы</span>
            <p>Еду на три дня: прогулки и ужин с друзьями. Обещают +12° и дождь. Что взять из моих вещей?</p>
          </li>
          <li className="stylist-chat-answer">
            <span className="stylist-chat-speaker">ИИ-стилист</span>
            <p>Возьмите белую футболку, тёмные брюки и удобные кеды. Добавьте жакет для ужина и плащ для дождя. Эти вещи сочетаются между собой — получится капсула на поездку.</p>
            <button ref={outfitOpener} type="button" className="stylist-chat-outfit" onClick={openOutfit} aria-haspopup="dialog" aria-controls={outfitDialogId}>
              <img src="/images/chat-outfit.webp" width={1024} height={1536} alt="" loading="lazy" />
              <span><strong>Образ для поездки</strong><span>Нажмите, чтобы рассмотреть</span><span className="stylist-chat-outfit-action" aria-hidden="true">Открыть образ ↗</span></span>
            </button>
            <span className="stylist-chat-context">Капсула из вашего гардероба</span>
          </li>
        </ol>
      </div>

      <dialog ref={outfitDialog} id={outfitDialogId} className="stylist-chat-outfit-dialog" aria-labelledby={outfitTitleId} onClose={() => outfitOpener.current?.focus()} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <div className="stylist-chat-outfit-dialog-topline"><h3 id={outfitTitleId}>Образ для поездки</h3><button type="button" className="stylist-chat-outfit-close" autoFocus onClick={() => outfitDialog.current?.close()} aria-label="Закрыть образ"><span aria-hidden="true">×</span></button></div>
        <img src="/images/chat-outfit.webp" width={1024} height={1536} alt="Пример образа для поездки: белая футболка, шоколадный жакет, тёмные брюки, светлые кеды и плащ на руке" />
        <p>Иллюстрация будущей функции ИИ-стилиста.</p>
      </dialog>
    </section>
  );
}
