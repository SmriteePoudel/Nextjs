"use client";
import CategoryList from "@/components/category/CategoryList";
import CourseList from "@/components/course/CourseList";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        <div className="max-w-7xl mx-auto">
          <CategoryList />
          <CourseList />
        </div>
      </div>
    </div>
  );
}
