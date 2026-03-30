import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ChevronRight, MapPin, CalendarDays, Download } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { destinations, itineraryDatabase } from "@/data/destinations";

import PixelSnow from "@/components/PixelSnow";

const Planner = () => {
  const [selectedDest, setSelectedDest] = useState("");
  const [days, setDays] = useState("3");
  const [customDestPrompt, setCustomDestPrompt] = useState("");
  const [customDaysCount, setCustomDaysCount] = useState("");
  const [result, setResult] = useState<string[][] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  const handleDownloadPDF = () => {
    const originalElement = document.getElementById("itinerary-content");
    if (!originalElement) return;

    // Temporarily expand to full height for PDF capture
    const oldMaxHeight = originalElement.style.maxHeight;
    const oldOverflow = originalElement.style.overflow;
    const oldBg = originalElement.style.backgroundColor;
    originalElement.style.maxHeight = 'none';
    originalElement.style.overflow = 'visible';
    originalElement.style.backgroundColor = '#020617'; // Fallback terminal background

    const finalDestStr = selectedDest === "custom" 
      ? customDestPrompt 
      : destinations.find((d) => d.id === selectedDest)?.name || "Destination";

    const opt: any = {
      margin:       0.5,
      filename:     `WanderTrails_${finalDestStr.replace(/\s+/g, '_')}_Itinerary.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#020617', scrollY: 0 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(originalElement).save().finally(() => {
       // Restore original scrolling styles
       originalElement.style.maxHeight = oldMaxHeight;
       originalElement.style.overflow = oldOverflow;
       originalElement.style.backgroundColor = oldBg;
    });
  };

  const generate = useCallback(async () => {
    let finalDest = "";
    if (selectedDest === "custom") {
      finalDest = customDestPrompt;
    } else {
      const destData = destinations.find((d) => d.id === selectedDest);
      finalDest = destData ? `${destData.name}, ${destData.state}` : "";
    }

    if (!finalDest) return;

    setIsGenerating(true);
    setResult(null);

    let numDays = parseInt(days);
    if (days === "custom") {
      numDays = parseInt(customDaysCount) || 3;
    } else {
      numDays = numDays || 3;
    }
    // Limit to max 10 days
    numDays = Math.min(Math.max(1, numDays), 10);

    const initialLines = [
      `> Initializing WanderTrails Trail Scout...`,
      `> Destination: ${finalDest}`,
      `> Duration: ${numDays} ${numDays === 1 ? "day" : "days"}`,
      `> Analyzing terrain, weather patterns & local experiences...\n`,
    ];
    
    setDisplayedLines(initialLines);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("API Key missing in .env file. Please set VITE_GROQ_API_KEY.");

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{
            role: "user",
            content: `Act as a professional travel expert. Generate a condensed ${numDays}-day itinerary for ${finalDest}. Return the response ONLY as a valid JSON array of arrays. Each inner array represents a single day, and MUST contain exactly 3 strings representing Morning, Afternoon, and Evening plans. Make each string short and punchy, using 2-3 brief bullet points (e.g. "• Visit Museum • Quick lunch • Explore park"). Keep it very concise, maximum 1-2 short sentences per time slot. Generate exactly ${numDays} days. Example structure: [["• Quick breakfast • Museum tour", "• Local cafe • City walk", "• Dinner at plaza"], ["...", "...", "..."]]. Do NOT wrap the JSON in markdown formatting backticks (like \`\`\`json). Return STRICTLY the raw JSON array string and nothing else.`
          }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        let errMsg = `Status: ${response.status}`;
        try {
          const errBody = await response.json();
          errMsg += ` - ${errBody.error?.message || JSON.stringify(errBody)}`;
        } catch (e) {}
        throw new Error(`Failed to fetch from Groq API (${errMsg})`);
      }

      const data = await response.json();
      let generatedPlan;
      try {
        const content = data.choices[0].message.content.trim();
        const cleanContent = content.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        generatedPlan = JSON.parse(cleanContent);
        if (!Array.isArray(generatedPlan)) throw new Error("Response is not an array");
      } catch (e) {
        console.error("Parse error", e, data);
        throw new Error("Failed to parse AI response into a valid JSON array.");
      }

      const newLines: string[] = [];
      generatedPlan.slice(0, numDays).forEach((dayActivities: string[], dayIdx: number) => {
        newLines.push(`━━━ DAY ${dayIdx + 1} ━━━`);
        const timeSlots = ["Morning", "Afternoon", "Evening"];
        dayActivities.slice(0, 3).forEach((activity, actIdx) => {
          newLines.push(`  ${timeSlots[actIdx] || "Activity"}: ${activity}`);
        });
        newLines.push("");
      });

      newLines.push(`> ✅ AI Itinerary ready! Enjoy your trip to ${finalDest}.`);

      let lineIdx = 0;
      const interval = setInterval(() => {
        if (lineIdx < newLines.length) {
          const newLine = newLines[lineIdx];
          setDisplayedLines((prev) => [...prev, newLine]);
          lineIdx++;
        } else {
          clearInterval(interval);
          setResult(generatedPlan);
          setIsGenerating(false);
        }
      }, 100);

    } catch (error) {
      setDisplayedLines((prev) => [
        ...prev,
        `> ❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ]);
      setIsGenerating(false);
    }
  }, [selectedDest, days, customDestPrompt, customDaysCount]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div className="relative pt-32 pb-20 px-5 overflow-hidden flex flex-col items-center">
        {/* PixelSnow Background Animation */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <PixelSnow 
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.0}
            density={0.25}
            direction={125}
            brightness={1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* Header */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-foreground/80 mb-5">
              <Sparkles size={14} className="text-secondary" />
              Intelligent Trail Scouting
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-3">
              <span className="gradient-text">Trail</span> Scout
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select your destination and trip length — our AI crafts a
              day-by-day plan with local experiences.
            </p>
          </motion.div>

          {/* Input controls */}
          <motion.div
            className="glass-card rounded-2xl p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="grid sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <MapPin size={14} className="text-primary" />
                  Destination
                </label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
                >
                  <option value="">Choose a destination...</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.state}
                    </option>
                  ))}
                  <option value="custom">Custom...</option>
                </select>
                {selectedDest === "custom" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="mt-3"
                  >
                    <input
                      type="text"
                      placeholder="Write the prompt of destination you want..."
                      value={customDestPrompt}
                      onChange={(e) => setCustomDestPrompt(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </motion.div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <CalendarDays size={14} className="text-secondary" />
                  Days
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
                >
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Day" : "Days"}</option>
                  ))}
                  <option value="custom">Custom...</option>
                </select>
                {days === "custom" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="mt-3"
                  >
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Enter number of days (Max 10)"
                      value={customDaysCount}
                      onChange={(e) => setCustomDaysCount(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={generate}
                disabled={!selectedDest || (selectedDest === 'custom' && !customDestPrompt) || isGenerating}
                className="btn-liquid px-8 py-3 rounded-xl font-display font-bold text-primary-foreground text-sm disabled:opacity-40 disabled:pointer-events-none"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={16} />
                  Generate
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Terminal output */}
          <AnimatePresence>
            {(displayedLines.length > 0 || isGenerating) && (
              <motion.div
                className="terminal rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-primary/15">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-secondary/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1.5">
                    <Terminal size={12} />
                    wandertrails-scout v2.0
                  </span>
                  {!isGenerating && result && (
                    <button 
                      onClick={handleDownloadPDF}
                      className="ml-auto flex items-center gap-1.5 text-[11px] font-medium bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full transition-colors"
                    >
                      <Download size={12} />
                      Save as PDF
                    </button>
                  )}
                </div>

                {/* Lines */}
                <div id="itinerary-content" className="p-5 max-h-[500px] overflow-y-auto text-sm leading-relaxed">
                  {displayedLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${
                        (line ?? "").startsWith(">") ? "text-primary" :
                        (line ?? "").startsWith("━") ? "text-secondary font-bold mt-2" :
                        (line ?? "").startsWith("  ") ? "text-foreground/80 pl-2" :
                        "text-muted-foreground"
                      }`}
                    >
                      {line || "\u00A0"}
                    </motion.div>
                  ))}
                  {isGenerating && (
                    <span className="inline-block w-2 h-4 bg-primary animate-typing-cursor ml-1" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Planner;
