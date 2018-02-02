module.exports = function(grunt){
//任务配置代码、插件加载代码、任务注册代码。
    var sassStyle = "expanded";

    //任务配置代码

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        sass:{
            output : {
                options: {
                    style: sassStyle
                },
                files: {
                    './style.css': './scss/style.scss'
                }
            }
        },
        concat:{
            options:{
                separator:':',
            },
            dist:{
                src:['.src/plugin.js','./src/plugin2.js'],
                dest:'./global.js',
            },
        },
        uglify:{
            compressjs:{   //压缩文件---》uglify中有3个任务：1.combine合并文件,2:compress压缩文件,3:fileCompress压缩文件
                files:{
                    './global.min.js':['./global.js']
                }
            }
        },
        jshint:{
            all:['./global.js']
        },
        watch:{
            sass:{
                files:['./scss/style.scss'],
                tasks:['sass']
            },
            script:{
                files:['./src/plugin.js','./src/plugin2.js'],
                tasks:['concat','jshint','uglify']
            },

            liverload:{
                options:{
                    liverload:'<%= connect.options.livereload %>'
                },
                files:[
                    'index.html',
                    'style.css',
                    'js/global.min.js'
                ]
            }
        },
        connect:{
            options:{
                port:8001,
                open:true,
                livereload:35729,
                hostname:'localhost'
            },
            server:{
                options:{
                    port:8003,
                    base:'../'
                }
            }
        }
    });

    //插件加载代码
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    //任务注册代码，，，执行【】中的任务。
    grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('concat.js',['concat']);
    grunt.registerTask('compressjs',['concat','jshint','uglify']);  //依次执行 合并、检查、压缩 任务。
    grunt.registerTask('watchit',['concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');
};