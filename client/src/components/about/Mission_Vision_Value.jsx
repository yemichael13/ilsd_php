import React from "react";
import { useTranslation } from 'react-i18next';

const Mission_Vision_Value = () => {
  const { t } = useTranslation();
  const goals = t('about.strategy.specificGoals', { returnObjects: true }) || [];
  const approach = t('about.strategy.approach', { returnObjects: true }) || [];

  return (
    <div className="w-full overflow-hidden bg-[#f3f6ed] px-3 py-10 text-[#183b2a] sm:px-4 md:px-10 md:py-16 lg:px-20">
      <div className="mx-auto min-w-0 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="min-w-0 rounded-2xl bg-[#183b2a] p-5 text-white shadow-xl sm:p-7 md:rounded-4xl md:p-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#d6e58b] sm:text-sm sm:tracking-[0.2em]">{t('about.strategy.eyebrow')}</p>
            <h2 className="max-w-2xl wrap-break-word text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">{t('about.strategy.title')}</h2>
            <div className="mt-7 grid gap-6 md:mt-8 md:grid-cols-2">
              <div className="min-w-0 border-l-2 border-[#d6e58b] pl-3 sm:pl-4">
                <h3 className="text-lg font-bold text-[#d6e58b] sm:text-xl">{t('about.mission.visionTitle')}</h3>
                <p className="mt-2 wrap-break-word leading-relaxed text-white/80">{t('about.mission.visionText')}</p>
              </div>
              <div className="min-w-0 border-l-2 border-[#d6e58b] pl-3 sm:pl-4">
                <h3 className="text-lg font-bold text-[#d6e58b] sm:text-xl">{t('about.mission.missionTitle')}</h3>
                <p className="mt-2 wrap-break-word leading-relaxed text-white/80">{t('about.mission.missionText')}</p>
              </div>
            </div>
          </article>
          <article className="min-w-0 rounded-2xl border border-[#c8d7b0] bg-white p-5 shadow-lg sm:p-7 md:rounded-4xl md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#668238] sm:text-sm sm:tracking-[0.18em]">{t('about.strategy.overallGoalTitle')}</p>
            <p className="mt-4 wrap-break-word text-xl font-bold leading-snug sm:mt-5 sm:text-2xl">{t('about.strategy.overallGoal')}</p>
            <p className="mt-5 wrap-break-word border-t border-[#dbe5d0] pt-5 leading-relaxed text-[#4e6254] sm:mt-6 sm:pt-6">{t('about.strategy.brandGoal')}</p>
          </article>
        </div>

        <section className="mt-12 md:mt-16">
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{t('about.strategy.specificGoalsTitle')}</h2>
            <span className="hidden rounded-full bg-[#dce9b0] px-4 py-2 text-sm font-bold text-[#355420] md:inline">09 priorities</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <article key={goal} className="group min-w-0 rounded-2xl border border-[#d6e1ca] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#668238] hover:shadow-lg sm:p-5">
                <span className="text-3xl font-bold text-[#b0c77a]">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-3 wrap-break-word leading-relaxed text-[#405447] sm:mt-4">{goal}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2">
          <article className="min-w-0 rounded-2xl bg-[#dce9b0] p-5 sm:p-7 md:rounded-4xl md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#355420] sm:text-sm sm:tracking-[0.18em]">{t('about.strategy.modelTitle')}</p>
            <p className="mt-3 wrap-break-word text-xl font-bold leading-snug sm:mt-4 sm:text-2xl">{t('about.strategy.modelText')}</p>
            <p className="mt-6 wrap-break-word border-t border-[#b8cc8c] pt-5 leading-relaxed text-[#405447] sm:mt-7 sm:pt-6"><strong>{t('about.strategy.longTermTitle')}:</strong> {t('about.strategy.longTermText')}</p>
          </article>
          <article className="min-w-0 rounded-2xl bg-white p-5 shadow-lg sm:p-7 md:rounded-4xl md:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('about.strategy.approachTitle')}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {approach.map((item) => (
                <div key={item.title} className="min-w-0 border-t-2 border-[#b0c77a] pt-3">
                  <h3 className="wrap-break-word font-bold">{item.title}</h3>
                  <p className="mt-1 wrap-break-word text-sm leading-relaxed text-[#5a6a5d]">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Mission_Vision_Value;