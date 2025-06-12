"use client";
import CategoryList from "@/components/category/CategoryList";
import CourseList from "@/components/course/CourseList";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-rows">
          <CategoryList />
          <CourseList />
        </div>
      </div>
    </div>
  );
}
