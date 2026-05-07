/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ExternalLink, 
  Calendar, 
  Clock, 
  FileText, 
  Menu, 
  X,
  ChevronRight,
  Info,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Notice {
  id: string;
  title: string;
  date: string;
  important: boolean;
}

interface TrainingRecord {
  id: string;
  title: string;
  date: string;
  hours: number;
  content: string;
  status: 'completed' | 'planned';
}

// --- Constants & Data ---
const CLUB_NAME = "M.S.G (Math-Social-GenAI)";
const SHARED_DRIVE_URL = "https://drive.google.com/drive/folders/1brw2rjM3Le451HcMzD0K33bF1hqsvdaJ";

const INITIAL_NOTICES: Notice[] = [
  { id: '1', title: '2026년 AI·디지털 교사 동아리 사전 설명회 안내', date: '2026-05-07', important: true },
  { id: '2', title: '5월 필수 연수(1차) 장소 및 준비물 안내', date: '2026-05-10', important: false },
  { id: '3', title: 'L.E.N.S 모델 기반 융합 수업 설계 프로젝트 시작', date: '2026-05-15', important: true },
];

const INITIAL_VISITING_TRAINING: TrainingRecord[] = [
  { id: 'v1', title: '필수 연수(1차): AI·디지털 기반 교육 혁신', date: '2026-05-20', hours: 3, content: '교수·학습 및 평가 설계 이해', status: 'planned' },
  { id: 'v2', title: '필수 연수(2차): 평가의 실행 및 환류', date: '2026-07-15', hours: 3, content: '과정 중심 평가 모델 설계', status: 'planned' },
];

const INITIAL_SELF_TRAINING: TrainingRecord[] = [
  { id: 's1', title: '자체 연수(1차): L.E.N.S 모델 내실화', date: '2026-07-05', hours: 2, content: '2022 개정 교육과정 분석', status: 'planned' },
  { id: 's2', title: '자체 연수(2차): 융합 수업 비법서 제작', date: '2026-09-10', hours: 2, content: '학년별 성치기준 매핑 및 AI 활용', status: 'planned' },
  { id: 's3', title: '자체 연수(3차): 수업 현장 적용 및 피드포워드', date: '2026-10-15', hours: 2, content: '영상 기록 공유플랫폼 탑재 및 비평', status: 'planned' },
  { id: 's4', title: '자체 연수(4차): 최종 편집 및 발간', date: '2026-11-20', hours: 3, content: '부산교수학습샘터 등 공유 플랫폼 탑재', status: 'planned' },
];

const MEMBERS = [
  { name: '정원화', school: '서천초', role: '회장', tasks: '자료 개발, 편집, 검토' },
  { name: '김희원', school: '서천초', role: '교사', tasks: '자료 개발, 편집, 검토' },
  { name: '김주민', school: '옥천초', role: '총무', tasks: '총무, 자료 개발, 편집, 검토' },
  { name: '전보경', school: '신연초', role: '교사', tasks: '공모계획서 작성, 자료 개발' },
  { name: '김미정', school: '백양초', role: '교사', tasks: '자료 개발, 협의회 진행' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-2 py-3 transition-all duration-200 border-b border-transparent ${
      active 
        ? 'text-[#1A1A1A] border-[#1A1A1A]' 
        : 'text-[#6B6862] hover:text-[#1A1A1A] hover:bg-[#F5F2ED]'
    }`}
  >
    <Icon size={18} strokeWidth={1.5} />
    <span className="font-sans text-xs font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const Card = ({ title, children, icon: Icon, className = "" }: { title: string, children: React.ReactNode, icon?: any, className?: string }) => (
  <div className={`bg-white rounded-none border border-[#D1CEC7] shadow-none overflow-hidden ${className}`}>
    <div className="px-6 py-3 border-b border-[#D1CEC7] flex items-center justify-between bg-[#FDFCFB]">
      <h3 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A] flex items-center gap-2">
        {Icon && <Icon size={14} className="text-[#D14F33]" />}
        {title}
      </h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'visiting' | 'self' | 'resources' | 'members'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const totalVisitingHours = useMemo(() => INITIAL_VISITING_TRAINING.reduce((acc, curr) => acc + curr.hours, 0), []);
  const totalSelfHours = useMemo(() => INITIAL_SELF_TRAINING.reduce((acc, curr) => acc + curr.hours, 0), []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-12">
            <header className="border-b border-[#D1CEC7] pb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D14F33] mb-4 block">혁신과 실천 • 2026</span>
              <h1 className="text-6xl font-serif font-black tracking-tighter uppercase leading-none text-[#1A1A1A] mb-4">
                M.S.G 교원<br />연구회
              </h1>
              <p className="text-[#6B6862] max-w-2xl text-lg font-serif italic italic-small leading-relaxed">
                L.E.N.S 모델과 멀티모달 AI를 활용한 '데이터 기반 사회 문제 해결' 융합 수업 설계 및 실천
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#D1CEC7] divide-y md:divide-y-0 md:divide-x divide-[#D1CEC7]">
              <div className="bg-[#FDFCFB] p-8 flex flex-col items-center text-center">
                <h4 className="text-[#A3A099] text-[10px] font-sans font-black uppercase tracking-[0.2em] mb-4">총 연수 시간</h4>
                <p className="text-5xl font-serif font-light text-[#1A1A1A] tracking-tighter">{totalVisitingHours + totalSelfHours}</p>
                <span className="text-[11px] font-serif italic text-[#A3A099] mt-2">시간 기록됨</span>
              </div>
              <div className="bg-[#1A1A1A] p-8 flex flex-col items-center text-center text-white">
                <h4 className="text-[#6B6862] text-[10px] font-sans font-black uppercase tracking-[0.2em] mb-4">핵심 연구원</h4>
                <p className="text-5xl font-serif font-light tracking-tighter">{MEMBERS.length}</p>
                <span className="text-[11px] font-serif italic text-white/40 mt-2">4개 학교 소속</span>
              </div>
              <div className="bg-[#FDFCFB] p-8 flex flex-col items-center text-center">
                <h4 className="text-[#A3A099] text-[10px] font-sans font-black uppercase tracking-[0.2em] mb-4">연구 핵심 모델</h4>
                <p className="text-3xl font-serif font-bold text-[#1A1A1A] tracking-tighter uppercase leading-tight pt-2">L.E.N.S</p>
                <span className="text-[11px] font-serif italic text-[#A3A099] mt-2">데이터 기반 융합</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <section>
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest border-b border-[#1A1A1A] pb-1 mb-6">최근 공지사항</h2>
                  <div className="space-y-6">
                    {INITIAL_NOTICES.map((notice) => (
                      <div key={notice.id} className="group cursor-pointer border-b border-[#E5E2DB] pb-4 last:border-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xl italic font-serif font-medium text-[#1A1A1A] group-hover:text-[#D14F33] transition-colors leading-tight">
                            {notice.title}
                          </h3>
                          <span className="text-[10px] font-sans text-[#A3A099] font-bold uppercase tracking-widest flex-shrink-0 ml-4">{notice.date}</span>
                        </div>
                        {notice.important && (
                          <span className="text-[9px] font-sans font-black uppercase tracking-widest border border-red-200 text-red-600 px-2 py-0.5 inline-block">중요 공지</span>
                        )}
                      </div>
                    ))}
                    <button className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#A3A099] hover:text-[#1A1A1A] transition-colors mt-4 block mx-auto py-2 border border-[#D1CEC7] px-8">
                      전체 아카이브 보기
                    </button>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="border-2 border-[#1A1A1A] p-8 flex flex-col items-center text-center bg-white">
                  <BookOpen size={32} className="text-[#1A1A1A] mb-4" strokeWidth={1} />
                  <h3 className="text-lg font-serif font-black mb-2 uppercase tracking-tighter">연구 자료 보관소</h3>
                  <p className="text-xs font-sans text-[#6B6862] mb-6 leading-relaxed">공유 데이터셋, 회의록, 연구 논문을 보안 포털을 통해 확인하세요.</p>
                  <a 
                    href={SHARED_DRIVE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-[#1A1A1A] text-white text-[10px] font-sans font-black uppercase tracking-[0.2em] hover:bg-[#333] transition-all shadow-lg"
                  >
                    구글 드라이브 접속
                  </a>
                </div>

                <div className="bg-[#F5F2ED] p-6 rounded-sm border border-[#D1CEC7]">
                   <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-[#1A1A1A] mb-4 border-b border-[#D1CEC7] pb-1">AI 도구 구독 관리</h4>
                   <div className="space-y-3">
                     {[
                       { name: 'ChatGPT Plus', purpose: '수업안 설계 및 분석', level: '100% 완료' },
                       { name: 'Claude Pro', purpose: '데이터 요약 및 정제', level: '검토 중' },
                       { name: 'Perplexity Pro', purpose: '학술 정보 실시간 검색', level: '도입 완료' }
                     ].map((ai, idx) => (
                       <div key={idx} className="flex justify-between items-center text-xs">
                         <div className="flex flex-col">
                           <span className="font-bold text-[#1A1A1A]">{ai.name}</span>
                           <span className="text-[10px] text-[#A3A099]">{ai.purpose}</span>
                         </div>
                         <span className="text-[9px] font-black uppercase bg-[#1A1A1A] text-white px-1.5 py-0.5">{ai.level}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-sm text-white">
                   <h4 className="text-[10px] font-sans font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">시스템 상태</h4>
                   <div className="flex items-center gap-3 text-white/60">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#D14F33]" />
                     <span className="text-xs font-sans">L.E.N.S 모델 V2.1 가동 중</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'visiting':
        return (
          <div className="space-y-12">
            <header className="border-b border-[#D1CEC7] pb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D14F33] mb-4 block">전문성 개발 및 역량 강화</span>
              <h2 className="text-5xl font-serif font-black tracking-tighter uppercase leading-none text-[#1A1A1A] mb-4">찾아가는 연수</h2>
              <p className="text-[#6B6862] text-lg font-serif italic italic-small leading-relaxed">교육청 및 외부 전문가 초빙 연수 기록 (총 6시간 필수)</p>
            </header>
            
            <div className="grid grid-cols-1 gap-px bg-[#D1CEC7] border border-[#D1CEC7]">
              {INITIAL_VISITING_TRAINING.map((item) => (
                <div key={item.id} className="bg-white p-8 group transition-all flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-shrink-0 w-20 h-20 bg-[#1A1A1A] text-white flex flex-col items-center justify-center font-serif">
                    <span className="text-3xl font-light">{item.hours}</span>
                    <span className="text-[9px] uppercase tracking-widest opacity-50">시간</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-sans font-bold text-[#A3A099] uppercase tracking-widest">{item.date}</span>
                      <div className="w-1 h-1 rounded-full bg-[#D1CEC7]" />
                      <span className={`text-[9px] font-sans font-black px-2 py-0.5 border uppercase tracking-tighter ${item.status === 'completed' ? 'border-emerald-200 text-emerald-600' : 'border-orange-200 text-orange-600'}`}>
                        {item.status === 'completed' ? '기록 확인됨' : '진행 예정'}
                      </span>
                    </div>
                    <h4 className="text-2xl font-serif italic font-medium text-[#1A1A1A] group-hover:text-[#D14F33] transition-colors mb-2 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[#6B6862] text-sm font-sans leading-relaxed max-w-2xl">
                      {item.content}
                    </p>
                  </div>
                  <button className="flex-shrink-0 px-6 py-2 border border-[#1A1A1A] text-[10px] font-sans font-black uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all">
                    상세 정보
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full py-12 border-2 border-dashed border-[#D1CEC7] text-[#A3A099] font-sans font-black uppercase tracking-[0.3em] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all flex flex-col items-center justify-center gap-4">
              <Users size={32} strokeWidth={1} />
              새로운 외부 연수 기록하기
            </button>
          </div>
        );
      case 'self':
        return (
          <div className="space-y-12">
            <header className="border-b border-[#D1CEC7] pb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D14F33] mb-4 block">자체 연구 및 내부 역량 강화</span>
              <h2 className="text-5xl font-serif font-black tracking-tighter uppercase leading-none text-[#1A1A1A] mb-4">자체 연구 연수</h2>
              <p className="text-[#6B6862] text-lg font-serif italic italic-small leading-relaxed">동아리 자체 연구 및 협의회 기록 (총 9시간 필수)</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D1CEC7] border border-[#D1CEC7]">
              {INITIAL_SELF_TRAINING.map((item) => (
                <div key={item.id} className="bg-white p-8 hover:bg-[#FDFCFB] transition-all group">
                   <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl font-serif font-light text-[#1A1A1A]">
                      {item.hours}<span className="text-sm font-sans font-black uppercase tracking-widest ml-1 opacity-30">시간</span>
                    </div>
                    <span className="text-[10px] font-sans font-bold text-[#A3A099] uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h4 className="text-2xl font-serif italic font-medium text-[#1A1A1A] mb-3 group-hover:text-[#D14F33] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[#6B6862] text-sm font-sans leading-relaxed mb-6 line-clamp-2">
                    {item.content}
                  </p>
                  <div className="pt-6 border-t border-[#E5E2DB] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Clock size={12} className="text-[#A3A099]" />
                       <span className="text-[9px] font-sans font-black text-[#A3A099] uppercase tracking-widest">{item.status === 'completed' ? '기록 완료' : '진행 중'}</span>
                    </div>
                    <button className="text-[10px] font-sans font-black text-[#1A1A1A] uppercase tracking-widest hover:underline decoration-[#D14F33]">기록 편집</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-12 border-2 border-dashed border-[#D1CEC7] text-[#A3A099] font-sans font-black uppercase tracking-[0.3em] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all flex flex-col items-center justify-center gap-4">
              <Calendar size={32} strokeWidth={1} />
              자체 연구 연수 기록 등록
            </button>
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-12">
             <header className="border-b border-[#D1CEC7] pb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D14F33] mb-4 block">지식 관리 및 자료 아카이브</span>
              <h2 className="text-5xl font-serif font-black tracking-tighter uppercase leading-none text-[#1A1A1A] mb-4">연구 자료 보관소</h2>
              <p className="text-[#6B6862] text-lg font-serif italic italic-small leading-relaxed">구글 공유 드라이브 및 주요 연구 문서 링크</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D1CEC7] border border-[#D1CEC7]">
              <a 
                href={SHARED_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white p-10 hover:bg-[#FDFCFB] transition-all group relative overflow-hidden flex flex-col items-center text-center"
              >
                <BookOpen size={48} className="text-[#1A1A1A] mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-serif font-black text-[#1A1A1A] mb-3 uppercase tracking-tighter">공유 드라이브</h3>
                <p className="text-[#6B6862] text-sm font-sans mb-8 leading-relaxed">M.S.G 교원 연구회의 모든 연구 산출물이 보관되는 공식 드라이브입니다.</p>
                <div className="mt-auto flex items-center text-[#D14F33] font-sans font-black text-[10px] uppercase tracking-widest">
                  보안 접속하기 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <div className="bg-[#1A1A1A] p-10 text-white flex flex-col items-center text-center">
                <Info size={48} className="text-[#D14F33] mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-serif font-black mb-3 uppercase tracking-tighter">L.E.N.S 가이드</h3>
                <p className="text-white/40 text-sm font-sans leading-relaxed mb-8">핵심 연구 모델에 대한 상세 가이드라인 및 구현 사례</p>
                <div className="mt-auto flex items-center gap-2 text-white/50 font-sans font-black text-[9px] uppercase tracking-widest border border-white/20 px-4 py-2">
                  준비 중
                </div>
              </div>

              <div className="bg-[#F5F2ED] p-10 flex flex-col items-center justify-center text-center">
                <FileText size={48} className="text-[#D1CEC7] mb-6" strokeWidth={1} />
                <p className="text-[#A3A099] text-xs font-sans font-bold uppercase tracking-[0.2em] leading-tight italic">예정된<br />문서 아카이브</p>
              </div>
            </div>
          </div>
        );
      case 'members':
        return (
           <div className="space-y-12">
             <header className="border-b border-[#D1CEC7] pb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D14F33] mb-4 block">연구 공동체 조직</span>
              <h2 className="text-5xl font-serif font-black tracking-tighter uppercase leading-none text-[#1A1A1A] mb-4">동아리 회원 명부</h2>
              <p className="text-[#6B6862] text-lg font-serif italic italic-small leading-relaxed">함께 연구하며 디지털 미래를 설계하는 5명의 혁신 교사들</p>
            </header>

            <div className="bg-white border border-[#D1CEC7] shadow-none overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#1A1A1A] text-white">
                    <tr className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
                      <th className="px-8 py-4 border-r border-white/10">성함 / Name</th>
                      <th className="px-8 py-4 border-r border-white/10">소속 / School</th>
                      <th className="px-8 py-4 border-r border-white/10">역할</th>
                      <th className="px-8 py-4">주요 전담 과업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DB] font-serif">
                    {MEMBERS.map((member, i) => (
                      <tr key={i} className="hover:bg-[#F5F2ED] transition-colors">
                        <td className="px-8 py-6 font-bold text-[#1A1A1A] text-lg">{member.name}</td>
                        <td className="px-8 py-6 text-[#6B6862] italic italic-small">{member.school}</td>
                        <td className="px-8 py-6">
                          <span className="text-[9px] font-sans font-black text-[#D14F33] uppercase tracking-widest border border-[#D14F33] px-3 py-1">{member.role}</span>
                        </td>
                        <td className="px-8 py-6 text-sm text-[#6B6862] font-sans font-medium uppercase tracking-tighter leading-relaxed">{member.tasks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex font-serif text-[#1A1A1A]">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm z-40 lg:hidden"
           />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-[#D1CEC7] z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-none flex items-center justify-center text-white shrink-0">
              <BookOpen size={20} strokeWidth={1} />
            </div>
            <div>
               <h2 className="text-2xl font-serif font-black tracking-tighter leading-none uppercase italic underline decoration-[#D14F33] decoration-2 underline-offset-4">M.S.G</h2>
               <p className="text-[9px] font-sans font-black text-[#A3A099] uppercase tracking-[0.2em] mt-2">AI-교원-연구회</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden ml-auto p-2 text-[#A3A099] hover:text-[#1A1A1A]"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-2">
            <SidebarItem label="대시보드" icon={LayoutDashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem label="찾아가는 연수" icon={Users} active={activeTab === 'visiting'} onClick={() => setActiveTab('visiting')} />
            <SidebarItem label="자체 연구 연수" icon={Clock} active={activeTab === 'self'} onClick={() => setActiveTab('self')} />
            <SidebarItem label="자료실" icon={FileText} active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
            <SidebarItem label="회원 명부" icon={Users} active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          </nav>

          <footer className="mt-8 pt-8 border-t border-[#D1CEC7]">
             <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#A3A099]">교육혁신 • 2026</span>
          </footer>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 bg-[#FDFCFB]">
        {/* Header */}
        <header className="h-16 px-8 flex items-center justify-between sticky top-0 z-30 border-b border-[#D1CEC7] bg-[#FDFCFB]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-[#6B6862] hover:text-[#1A1A1A]"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3 text-[#A3A099]">
               <span className="text-[10px] font-sans font-black uppercase tracking-widest hidden sm:inline">{activeTab === 'dashboard' ? '대시보드' : activeTab === 'visiting' ? '찾아가는 연수' : activeTab === 'self' ? '자체 연구' : activeTab === 'resources' ? '자료실' : '회원명부'}</span>
               <div className="w-1 h-1 rounded-full bg-[#D1CEC7] hidden sm:inline" />
               <h1 className="text-[10px] font-sans font-black text-[#1A1A1A] uppercase tracking-widest">
                 {activeTab === 'dashboard' ? '개요' : activeTab === 'visiting' ? '외부 연수' : activeTab === 'self' ? '자체 연구' : activeTab === 'resources' ? '지식창고' : '연구진'}
               </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="relative p-2 text-[#6B6862] hover:text-[#1A1A1A] transition-colors">
               <Bell size={18} strokeWidth={1.5} />
               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D14F33] rounded-full" />
             </button>
             <div className="w-8 h-8 rounded-none border border-[#1A1A1A] overflow-hidden p-0.5">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="Avatar" 
                 className="w-full h-full object-cover grayscale"
                 referrerPolicy="no-referrer"
               />
             </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto">
          <section className="p-8 sm:p-12 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Page Footer Decor */}
          <div className="p-8 sm:p-12 border-t border-[#D1CEC7] flex justify-between items-center bg-white">
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#A3A099]">© 2026 M.S.G 연구 공동체</p>
            <div className="hidden sm:flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D1CEC7]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D14F33]"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
