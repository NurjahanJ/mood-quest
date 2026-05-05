# MoodQuest Documentation

Welcome to the MoodQuest documentation! This folder contains all sprint planning and project documentation.

---

## 📚 Documentation Structure

### Core Documents
- **PROJECT-OVERVIEW.md** - Complete project overview, goals, and architecture
- **FILE-STATUS.md** - Track which files exist, need updates, or should not be modified

### Sprint Files
- **sprint-1.md** - Core Data Layer (types, datasets, scoring, storage)
- **sprint-2.md** - Validation & Fallback System
- **sprint-3.md** - Selection Components (Category, Mode)
- **sprint-4.md** - Dynamic Preference Form
- **sprint-5.md** - Enhanced Recommendation Card
- **sprint-6.md** - Results & Profile Components
- **sprint-7.md** - Comparison Components
- **sprint-8.md** - API Routes (recommend, refine)
- **sprint-9.md** - Main Application Flow
- **sprint-10.md** - Testing
- **sprint-11.md** - Documentation & Polish

---

## 🚀 Quick Start

1. **Read PROJECT-OVERVIEW.md** to understand the full scope
2. **Check FILE-STATUS.md** to see current progress
3. **Start with sprint-1.md** and work sequentially
4. **Update FILE-STATUS.md** as you complete tasks

---

## 📋 Sprint Progress

| Sprint | Focus | Status | Files |
|--------|-------|--------|-------|
| 1 | Core Data Layer | ✅ Partial | types.ts ✅ |
| 2 | Validation & Fallback | ⏳ Pending | validation.ts, fallbackRecommendations.ts |
| 3 | Selection Components | ⏳ Pending | CategorySelector, ModeSelector |
| 4 | Preference Form | ⏳ Pending | PreferenceForm.tsx |
| 5 | Recommendation Card | ⏳ Pending | RecommendationCard.tsx |
| 6 | Results & Profile | ⏳ Pending | ResultsSection, TasteProfile, History |
| 7 | Comparison | ⏳ Pending | GameComparison, MovieComparison |
| 8 | API Routes | ⏳ Pending | /api/recommend, /api/refine |
| 9 | Main App Flow | ⏳ Pending | page.tsx |
| 10 | Testing | ⏳ Pending | All test files |
| 11 | Documentation | ⏳ Pending | README.md, comments |

---

## 🎯 Current Sprint

**Sprint 1: Core Data Layer**

**Next Tasks:**
1. Create `src/lib/gameDataset.ts` with 20+ games
2. Create `src/lib/movieDataset.ts` with 20+ movies
3. Create `src/lib/scoring.ts` with scoring algorithm
4. Create `src/lib/storage.ts` with localStorage utilities

See `sprint-1.md` for detailed instructions.

---

## 📝 How to Use These Docs

### For Developers

1. **Starting a Sprint:**
   - Open the sprint markdown file
   - Read the overview and goals
   - Follow tasks in order
   - Check acceptance criteria

2. **During Development:**
   - Reference FILE-STATUS.md for dependencies
   - Add comprehensive comments to all code
   - Test as you go
   - Update progress in sprint file

3. **Completing a Sprint:**
   - Verify all acceptance criteria met
   - Run tests if applicable
   - Commit changes with proper message
   - Update FILE-STATUS.md
   - Move to next sprint

### For Code Reviews

1. Check that all acceptance criteria are met
2. Verify comprehensive comments exist
3. Ensure no files marked "DO NOT MODIFY" were changed
4. Test functionality manually
5. Review code quality and consistency

---

## 🔒 Important Files

### DO NOT MODIFY
These files are complete and should not be changed:
- `src/lib/types.ts` - Core type system
- Configuration files (package.json, tsconfig.json, etc.)

### NEEDS UPDATE
These files exist but need updates:
- `src/lib/validation.ts`
- `src/lib/fallbackRecommendations.ts`
- `src/app/api/recommend/route.ts`
- `src/app/page.tsx`

### TO CREATE
See FILE-STATUS.md for complete list of files to create.

---

## 💡 Tips

- **Read comments:** Every file has comprehensive documentation
- **Follow the plan:** Sprints build on each other
- **Test early:** Don't wait until the end
- **Ask questions:** If something is unclear, check PROJECT-OVERVIEW.md
- **Stay organized:** Update FILE-STATUS.md regularly

---

## 🐛 Common Issues

### TypeScript Errors
- Check that types.ts has all required exports
- Verify imports are correct
- Ensure no circular dependencies

### Component Not Rendering
- Check that component is properly exported
- Verify props are passed correctly
- Look for console errors

### localStorage Not Working
- Verify `typeof window !== 'undefined'` checks
- Check that keys match storage.ts constants
- Clear localStorage if testing

---

## 📞 Need Help?

1. Check the specific sprint file for detailed instructions
2. Review PROJECT-OVERVIEW.md for architecture questions
3. Check FILE-STATUS.md for dependency information
4. Look at existing code for patterns and examples

---

## ✅ Definition of Done

A sprint is complete when:
- [ ] All tasks in sprint file are completed
- [ ] All acceptance criteria are met
- [ ] All files have comprehensive comments
- [ ] No TypeScript errors exist
- [ ] Manual testing passes
- [ ] Changes are committed to git
- [ ] FILE-STATUS.md is updated
- [ ] Ready to start next sprint

---

Last Updated: Sprint 1 in progress
