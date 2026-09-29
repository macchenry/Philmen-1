import React from 'react';
import { ArrowRight } from 'lucide-react';

// Import curated high-fidelity imagery for section collages
import carRentalVipSuv from '../assets/images/car_rental_vip_suv_1790684838567.jpg';
import carRentalFleetVertical from '../assets/images/car_rental_fleet_vertical_1790684853495.jpg';
import carSalesShowroom from '../assets/images/car_sales_showroom_lot_1790684867833.jpg';
import carSalesSedanVertical from '../assets/images/car_sales_sedan_vertical_1790684882452.jpg';
import carSalesSedanProduct from '../assets/images/product_toyota_corolla_1790521470974.jpg';
import electronicsShowcase from '../assets/images/electronics_appliances_showcase_1790684910174.jpg';
import productFridge from '../assets/images/product_samsung_fridge_1790521460343.jpg';

interface Props {
  onSelectService: (serviceSlug: string) => void;
  onNavigate: (route: string) => void;
}

export const PreHomePage: React.FC<Props> = ({ onSelectService }) => {
  return (
    <div className="pt-8 sm:pt-12 pb-16 space-y-12 sm:space-y-16 lg:space-y-20 overflow-x-hidden bg-slate-950 text-white">
      
      {/* THREE DEDICATED SEPARATED SERVICE SECTIONS WITH CLEAR VIBRANT IMAGE COLLAGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1 (TOP): CAR RENTAL */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl border border-slate-800 shadow-2xl overflow-hidden hover:border-amber-500/80 transition-all duration-500 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center p-6 sm:p-12 lg:p-16 group">
          
          {/* Section 1 Crystal-Clear Collage Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="grid grid-cols-12 grid-rows-2 gap-2 sm:gap-3.5 w-full h-full p-2 sm:p-3 opacity-95 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-[1.01]">
              
              {/* 1. Vertical Rectangle (Left) */}
              <div className="col-span-4 sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carRentalFleetVertical}
                  alt="Executive Luxury SUV Car Rental Fleet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 2. Horizontal Rectangle (Top Middle) */}
              <div className="col-span-8 sm:col-span-6 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carRentalVipSuv}
                  alt="VIP Chauffeur Land Cruiser Prado Rental"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 3. Square (Bottom Middle-Left) */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/Gv8vXdQR/007-Toyota-Land-Cruiser.jpg"
                  alt="Toyota Land Cruiser Prado Rental"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 4. Horizontal Rectangle (Bottom Middle-Right) */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg"
                  alt="Executive Sedan Rental Fleet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 5. Vertical Rectangle (Right - Desktop) */}
              <div className="hidden sm:block sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carRentalFleetVertical}
                  alt="Executive Airport Protocol Chauffeur Fleet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

            </div>
          </div>

          {/* Transparent Light Vignette to keep photos vibrant & clear */}
          <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors duration-500 z-10 pointer-events-none" />

          {/* Centered Content: Focused Card for Crisp Readability */}
          <div className="relative z-20 text-center flex flex-col items-center justify-center space-y-5 sm:space-y-6 max-w-xl mx-auto py-6 sm:py-8 px-6 sm:px-10 bg-slate-950/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center leading-tight">
              Car Rental
            </h2>

            <button
              type="button"
              onClick={() => onSelectService('car-rental')}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_25px_rgba(245,158,11,0.4)] inline-flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group/btn"
            >
              <span>Enter Car Rental Home Page</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </section>


        {/* ========================================================================= */}
        {/* SECTION 2 (MIDDLE): CAR SALES */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl border border-slate-800 shadow-2xl overflow-hidden hover:border-amber-500/80 transition-all duration-500 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center p-6 sm:p-12 lg:p-16 group">
          
          {/* Section 2 Crystal-Clear Collage Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="grid grid-cols-12 grid-rows-2 gap-2 sm:gap-3.5 w-full h-full p-2 sm:p-3 opacity-95 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-[1.01]">
              
              {/* 1. Vertical Rectangle (Left) */}
              <div className="col-span-4 sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carSalesSedanVertical}
                  alt="Verified Foreign-Used Sedan for Sale"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 2. Horizontal Rectangle (Top Middle) */}
              <div className="col-span-8 sm:col-span-6 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carSalesShowroom}
                  alt="Automobile Dealership Showroom Inventory"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 3. Square (Bottom Middle-Left) */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg"
                  alt="Toyota Corolla LE 2022 Verified Sale"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 4. Horizontal Rectangle (Bottom Middle-Right) */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carSalesSedanProduct}
                  alt="Toyota Corolla Certified Foreign Used"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 5. Vertical Rectangle (Right - Desktop) */}
              <div className="hidden sm:block sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={carSalesSedanVertical}
                  alt="Certified Clean Title Vehicle Sales"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
                />
              </div>

            </div>
          </div>

          {/* Transparent Light Vignette to keep photos vibrant & clear */}
          <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors duration-500 z-10 pointer-events-none" />

          {/* Centered Content: Focused Card for Crisp Readability */}
          <div className="relative z-20 text-center flex flex-col items-center justify-center space-y-5 sm:space-y-6 max-w-xl mx-auto py-6 sm:py-8 px-6 sm:px-10 bg-slate-950/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center leading-tight">
              Car Sales
            </h2>

            <button
              type="button"
              onClick={() => onSelectService('car-sales')}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_25px_rgba(245,158,11,0.4)] inline-flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group/btn"
            >
              <span>Enter Car Sales Home Page</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </section>


        {/* ========================================================================= */}
        {/* SECTION 3 (BOTTOM): ELECTRONICS, ELECTRICALS & HOME APPLIANCES */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl border border-slate-800 shadow-2xl overflow-hidden hover:border-amber-500/80 transition-all duration-500 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center p-6 sm:p-12 lg:p-16 group">
          
          {/* Section 3 Crystal-Clear Collage Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="grid grid-cols-12 grid-rows-2 gap-2 sm:gap-3.5 w-full h-full p-2 sm:p-3 opacity-95 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-[1.01]">
              
              {/* 1. Vertical Rectangle (Left) - 50kg Heavy Industrial Cylinder */}
              <div className="col-span-4 sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/svzqxf7d/009-Gas-Cylinder-1.jpg"
                  alt="50kg Industrial Steel LPG Gas Cylinder"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 2. Horizontal Rectangle (Top Middle) - Appliance Showroom */}
              <div className="col-span-8 sm:col-span-6 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={electronicsShowcase}
                  alt="Inverter Split ACs & Appliances Showroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 3. Square (Bottom Middle-Left) - Samsung Double Door Fridge */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src={productFridge}
                  alt="Samsung 535L Inverter Double Door Fridge"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 4. Horizontal Rectangle (Bottom Middle-Right) - Split AC Unit */}
              <div className="col-span-4 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/4wJ7S3V9/014-Sigma-Airconditioner.jpg"
                  alt="Gree 2.0HP Eco Inverter Split Air Conditioner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 5. Vertical Rectangle (Right - Desktop) - Composite LPG Safety Cylinder */}
              <div className="hidden sm:block sm:col-span-3 row-span-2 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-md">
                <img
                  src="https://i.ibb.co/Swwp6nMM/011-Gas-Cylinder.jpg"
                  alt="Certified Composite Explosion-Proof Gas Cylinder"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

            </div>
          </div>

          {/* Transparent Light Vignette to keep photos vibrant & clear */}
          <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors duration-500 z-10 pointer-events-none" />

          {/* Centered Content: Focused Card for Crisp Readability */}
          <div className="relative z-20 text-center flex flex-col items-center justify-center space-y-5 sm:space-y-6 max-w-2xl mx-auto py-6 sm:py-8 px-6 sm:px-10 bg-slate-950/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center leading-tight">
              Electronics, Electricals & Home Appliances
            </h2>

            <button
              type="button"
              onClick={() => onSelectService('electronics-electricals-and-home-appliances')}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_25px_rgba(245,158,11,0.4)] inline-flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group/btn"
            >
              <span>Enter Electronics & Appliances Home Page</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </section>

      </div>

    </div>
  );
};
