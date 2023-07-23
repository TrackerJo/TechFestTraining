import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')


// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: '/TechFestTraining/',
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      assetFileNames: ({name}) => {
        return 'assets/[name]-[hash][extname]';
      },
      input: {
        index: resolve(root,  'index.html'),
        AddProblem: resolve(root,  'AddProblem' ,'index.html'),
        Competition: resolve(root,  'Competition' ,'index.html'),
        FindProblems: resolve(root,  'FindProblems' ,'index.html'),
        Login: resolve(root ,'Login' ,'index.html'),
        ProblemFolders: resolve(root,  'ProblemFolders' ,'index.html'),
        Problems: resolve(root,  'Problems' ,'index.html'),
        StartCompetiton: resolve(root,  'StartCompetiton' ,'index.html'),
        ViewProblem: resolve(root,  'ViewProblem' ,'index.html'),
        CompletedProblems: resolve(root,  'CompletedProblems' ,'index.html'),
      }
    }
  }
})
